const STORAGE_KEYS = {
  records: "jiageyouba:v34:records",
  settings: "jiageyouba:v34:settings",
};

const DEFAULT_SETTINGS = {
  unit: "metric",
  garage: {
    current: {
      name: "保时捷 911 GT3",
      plate: "沪A · 911GT3",
    },
    backup: {
      name: "路虎 卫士 110",
      mileageKm: 4500.5,
    },
  },
};

const FUEL_TYPES = ["92#", "95#", "98#"];
const LITERS_PER_GALLON = 3.785411784;
const MILES_PER_KM = 0.621371;
const DONUT_CIRCUMFERENCE = 251.2;

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `record-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function asNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getToday(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
}

function formatNumber(value, digits = 2) {
  return new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(asNumber(value));
}

function formatInteger(value) {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(asNumber(value));
}

function formatDateHeading(value) {
  if (!value) return "--";
  const [year, month, day] = String(value).split("-");
  return `${year}年${month}月${day}日`;
}

function formatTime(value) {
  if (!value) return "--:--";
  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function monthKey(value) {
  const date = new Date(`${value}T00:00:00`);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function previousMonthKey(value) {
  const [yearText, monthText] = value.split("-");
  const date = new Date(Number(yearText), Number(monthText) - 2, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function normalizeRecord(raw = {}) {
  const liters = asNumber(raw.liters);
  const totalCost = asNumber(raw.totalCost);
  const createdAt = raw.createdAt || new Date().toISOString();
  const updatedAt = raw.updatedAt || createdAt;

  return {
    id: raw.id || createId(),
    date: String(raw.date || getToday()),
    odometer: asNumber(raw.odometer),
    totalCost: Number(totalCost.toFixed(2)),
    liters: Number(liters.toFixed(2)),
    unitPrice: liters > 0 ? Number((totalCost / liters).toFixed(3)) : 0,
    fuelType: String(raw.fuelType || "95#"),
    isFullTank: Boolean(raw.isFullTank),
    createdAt,
    updatedAt,
  };
}

function compareRecordsDesc(left, right) {
  if (left.date !== right.date) {
    return right.date.localeCompare(left.date);
  }
  return String(right.updatedAt || "").localeCompare(String(left.updatedAt || ""));
}

function compareRecordsChronological(left, right) {
  if (left.date !== right.date) {
    return left.date.localeCompare(right.date);
  }
  return String(left.createdAt || left.updatedAt || "").localeCompare(String(right.createdAt || right.updatedAt || ""));
}

function compareRecordsByMileage(left, right) {
  if (left.odometer !== right.odometer) {
    return left.odometer - right.odometer;
  }
  return compareRecordsChronological(left, right);
}

function loadRecords() {
  return readJson(STORAGE_KEYS.records, []).map(normalizeRecord).sort(compareRecordsDesc);
}

function saveRecords(records) {
  writeJson(
    STORAGE_KEYS.records,
    records.map(normalizeRecord).sort(compareRecordsDesc)
  );
}

function loadSettings() {
  const stored = readJson(STORAGE_KEYS.settings, {});
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    garage: {
      current: {
        ...DEFAULT_SETTINGS.garage.current,
        ...(stored.garage?.current || {}),
      },
      backup: {
        ...DEFAULT_SETTINGS.garage.backup,
        ...(stored.garage?.backup || {}),
      },
    },
  };
}

function saveSettings(settings) {
  writeJson(STORAGE_KEYS.settings, settings);
}

function getNeighbors(records, recordId) {
  const ordered = [...records].sort(compareRecordsChronological);
  const index = ordered.findIndex((record) => record.id === recordId);

  return {
    previous: index > 0 ? ordered[index - 1] : null,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

function validateOdometer(records, candidateRecord) {
  const { previous, next } = getNeighbors(records, candidateRecord.id);

  if (previous && candidateRecord.odometer < previous.odometer) {
    return `当前里程不能小于上一条记录（${formatDateHeading(previous.date)}，${formatInteger(previous.odometer)} km）`;
  }

  if (next && candidateRecord.odometer > next.odometer) {
    return `当前里程不能大于下一条记录（${formatDateHeading(next.date)}，${formatInteger(next.odometer)} km）`;
  }

  return "";
}

function buildEfficiencySeries(records) {
  const ordered = [...records]
    .filter((record) => record.odometer > 0 && record.liters > 0)
    .sort(compareRecordsByMileage);

  const series = [];
  let anchor = null;
  let liters = 0;

  ordered.forEach((record) => {
    if (!anchor) {
      if (record.isFullTank) {
        anchor = record;
      }
      return;
    }

    if (record.odometer <= anchor.odometer) {
      if (record.isFullTank) {
        anchor = record;
        liters = 0;
      }
      return;
    }

    liters += record.liters;
    if (!record.isFullTank) {
      return;
    }

    const distance = record.odometer - anchor.odometer;
    const value = distance > 0 ? (liters * 100) / distance : 0;

    if (value > 1 && value < 30) {
      series.push({
        recordId: record.id,
        date: record.date,
        value,
        distance,
        liters,
      });
    }

    anchor = record;
    liters = 0;
  });

  return series;
}

function summarize(records, efficiencySeries) {
  const totalSpend = records.reduce((sum, record) => sum + record.totalCost, 0);
  const totalLiters = records.reduce((sum, record) => sum + record.liters, 0);
  const odometers = records.map((record) => record.odometer).filter((value) => value > 0);
  const distanceCoverage = odometers.length > 1 ? Math.max(...odometers) - Math.min(...odometers) : 0;

  return {
    count: records.length,
    totalSpend,
    totalLiters,
    distanceCoverage,
    avgPrice: totalLiters > 0 ? totalSpend / totalLiters : 0,
    avgEfficiency:
      efficiencySeries.length > 0
        ? efficiencySeries.reduce((sum, item) => sum + item.value, 0) / efficiencySeries.length
        : 0,
  };
}

function deriveData(records) {
  const current = monthKey(getToday());
  const previous = previousMonthKey(current);
  const efficiencySeries = buildEfficiencySeries(records);
  const currentMonthRecords = records.filter((record) => monthKey(record.date) === current);
  const previousMonthRecords = records.filter((record) => monthKey(record.date) === previous);
  const currentEfficiency = efficiencySeries.filter((item) => monthKey(item.date) === current);
  const previousEfficiency = efficiencySeries.filter((item) => monthKey(item.date) === previous);

  return {
    all: summarize(records, efficiencySeries),
    monthly: summarize(currentMonthRecords, currentEfficiency),
    previousMonthly: summarize(previousMonthRecords, previousEfficiency),
    efficiencyByRecordId: new Map(efficiencySeries.map((item) => [item.recordId, item.value])),
  };
}

function deltaLabel(currentValue, previousValue) {
  if (!currentValue && !previousValue) {
    return "暂无变化";
  }

  if (!previousValue) {
    return "较上月新增";
  }

  const diff = ((currentValue - previousValue) / previousValue) * 100;
  if (Math.abs(diff) < 1) {
    return "较上月持平";
  }
  const direction = diff > 0 ? "增长" : "下降";
  return `较上月${direction} ${formatNumber(Math.abs(diff), 0)}%`;
}

function getUnitMode() {
  return loadSettings().unit === "imperial" ? "imperial" : "metric";
}

function formatDistanceDisplay(kilometers, unitMode, digits = 0) {
  if (unitMode === "imperial") {
    return formatNumber(kilometers * MILES_PER_KM, digits);
  }
  return digits === 0 ? formatInteger(kilometers) : formatNumber(kilometers, digits);
}

function formatEfficiencyDisplay(litersPer100Km, unitMode) {
  if (!litersPer100Km) {
    return "--";
  }

  if (unitMode === "imperial") {
    return `${formatNumber(235.214583 / litersPer100Km, 1)} MPG`;
  }

  return `${formatNumber(100 / litersPer100Km, 1)} KM/L`;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function toCsv(records) {
  const header = ["id", "date", "odometer", "totalCost", "liters", "unitPrice", "fuelType", "isFullTank", "createdAt", "updatedAt"];
  const rows = records.map((record) =>
    header.map((key) => {
      const text = String(record[key] ?? "");
      return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    })
  );

  return [header, ...rows].map((row) => row.join(",")).join("\r\n");
}

function consumeFlash() {
  const params = new URLSearchParams(window.location.search);
  const flash = params.get("flash");
  if (!flash) {
    return "";
  }
  params.delete("flash");
  const query = params.toString();
  const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", nextUrl);
  return flash;
}

function showFlash() {
  const flash = consumeFlash();
  if (!flash) {
    return;
  }

  const messages = {
    saved: "记录已保存",
    updated: "记录已更新",
    imported: "备份已恢复",
  };

  if (messages[flash]) {
    window.setTimeout(() => window.alert(messages[flash]), 50);
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

function initDashboardPage() {
  const records = loadRecords();
  const settings = loadSettings();
  const unitMode = settings.unit;
  const data = deriveData(records);

  setText("dashboardMonthlySpend", formatNumber(data.monthly.totalSpend, 2));
  setText("dashboardMonthlyDelta", deltaLabel(data.monthly.totalSpend, data.previousMonthly.totalSpend));
  setText("dashboardMonthlyMileage", formatDistanceDisplay(data.monthly.distanceCoverage, unitMode, 0));
  setText("dashboardMileageUnit", unitMode === "imperial" ? "英里" : "公里");
  setText("dashboardAvgEfficiency", formatEfficiencyDisplay(data.monthly.avgEfficiency, unitMode));
  setText("dashboardCurrentCarName", settings.garage.current.name);
}

function renderHistoryList() {
  const records = loadRecords();
  const settings = loadSettings();
  const unitMode = settings.unit;
  const data = deriveData(records);
  const list = document.getElementById("historyList");

  setText("logsTotalSpend", formatNumber(data.all.totalSpend, 2));

  if (!list) {
    return;
  }

  if (!records.length) {
    list.innerHTML = `
      <div class="group">
        <div class="bg-surface-container rounded-lg p-6">
          <p class="font-headline text-white font-bold text-lg">还没有加油记录</p>
          <p class="font-body text-sm text-on-surface-variant mt-2">先去“记录”页添加第一条数据，趋势和历史会自动生成。</p>
          <a class="inline-block mt-5 px-4 py-2 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-sm" href="./add.html">去记录</a>
        </div>
      </div>
    `;
    return;
  }

  list.innerHTML = records
    .map((record) => {
      const efficiency = data.efficiencyByRecordId.get(record.id) || 0;
      const efficiencyLabel = efficiency ? formatEfficiencyDisplay(efficiency, unitMode) : "--";
      const odometerLabel = formatDistanceDisplay(record.odometer, unitMode, 0);
      const odometerUnit = unitMode === "imperial" ? "MI" : "KM";

      return `
        <div class="group">
          <div class="flex justify-between items-end mb-4">
            <h2 class="font-headline text-on-surface font-medium text-[1.25rem]">${escapeHtml(formatDateHeading(record.date))}</h2>
            <span class="font-label text-on-surface-variant text-[0.75rem] font-bold tracking-wider">${escapeHtml(formatTime(record.updatedAt || record.createdAt))}</span>
          </div>
          <a class="block bg-surface-container rounded-lg p-6 transition-all duration-300 active:scale-[0.98] active:bg-surface-container-high cursor-pointer" href="./add.html?id=${encodeURIComponent(record.id)}">
            <div class="flex justify-between items-start mb-6">
              <div>
                <p class="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-tighter mb-1">加油车辆</p>
                <p class="font-headline text-white font-bold text-lg">${escapeHtml(settings.garage.current.plate)}</p>
              </div>
              <div class="text-right">
                <p class="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-tighter mb-1">实付金额</p>
                <p class="font-headline text-primary-fixed font-bold text-xl">${escapeHtml(formatNumber(record.totalCost, 2))}</p>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant/10">
              <div>
                <p class="font-label text-on-surface-variant text-[0.65rem] uppercase mb-1">油耗</p>
                <p class="font-headline text-white text-[0.9rem] font-medium">${escapeHtml(efficiencyLabel)}</p>
              </div>
              <div>
                <p class="font-label text-on-surface-variant text-[0.65rem] uppercase mb-1">当前里程</p>
                <p class="font-headline text-white text-[0.9rem] font-medium">${escapeHtml(odometerLabel)} ${odometerUnit}</p>
              </div>
              <div class="text-right">
                <p class="font-label text-on-surface-variant text-[0.65rem] uppercase mb-1">加油量</p>
                <p class="font-headline text-white text-[0.9rem] font-medium">${escapeHtml(formatNumber(record.liters, 2))} L</p>
              </div>
            </div>
          </a>
        </div>
      `;
    })
    .join("");
}

function setFuelButtons(activeFuelType) {
  document.querySelectorAll("[data-fuel-type]").forEach((button) => {
    const isActive = button.dataset.fuelType === activeFuelType;
    button.classList.add("fuel-option");
    button.classList.toggle("fuel-option--active", isActive);
    button.classList.toggle("fuel-option--inactive", !isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function initAddPage() {
  const params = new URLSearchParams(window.location.search);
  const editingId = params.get("id");
  const records = loadRecords();
  const editingRecord = records.find((record) => record.id === editingId) || null;

  const form = document.getElementById("recordForm");
  const dateInput = document.getElementById("recordDate");
  const odometerInput = document.getElementById("recordOdometer");
  const totalCostInput = document.getElementById("recordTotalCost");
  const litersInput = document.getElementById("recordLiters");
  const fullTankInput = document.getElementById("recordFullTank");
  const unitPriceDisplay = document.getElementById("recordUnitPriceDisplay");
  const pageHeading = document.getElementById("addPageHeading");
  const topTitle = document.getElementById("addPageTitle");

  let selectedFuelType = editingRecord?.fuelType || "95#";

  if (pageHeading && editingRecord) {
    pageHeading.textContent = "编辑本次旅程";
  }
  if (topTitle && editingRecord) {
    topTitle.textContent = "编辑记录";
  }

  if (dateInput) {
    dateInput.value = editingRecord?.date || getToday();
  }
  if (odometerInput) {
    odometerInput.value = editingRecord?.odometer || "";
  }
  if (totalCostInput) {
    totalCostInput.value = editingRecord?.totalCost || "";
  }
  if (litersInput) {
    litersInput.value = editingRecord?.liters || "";
  }
  if (fullTankInput) {
    fullTankInput.checked = editingRecord ? Boolean(editingRecord.isFullTank) : true;
  }

  function updateUnitPrice() {
    const totalCost = asNumber(totalCostInput?.value);
    const liters = asNumber(litersInput?.value);
    setText("recordUnitPriceDisplay", liters > 0 ? formatNumber(totalCost / liters, 2) : "0.00");
  }

  function buildDraftRecord() {
    return normalizeRecord({
      ...(editingRecord || {}),
      date: dateInput?.value || getToday(),
      odometer: asNumber(odometerInput?.value),
      totalCost: asNumber(totalCostInput?.value),
      liters: asNumber(litersInput?.value),
      fuelType: selectedFuelType,
      isFullTank: Boolean(fullTankInput?.checked),
      updatedAt: new Date().toISOString(),
    });
  }

  function validate(record, nextRecords) {
    if (!record.date || !record.odometer || !record.totalCost || !record.liters) {
      return "请完整填写日期、里程、总花费和加油量。";
    }

    if (record.totalCost <= 0 || record.liters <= 0) {
      return "总花费和加油量必须大于 0。";
    }

    return validateOdometer(nextRecords, record);
  }

  document.querySelector("[data-fuel-options]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fuel-type]");
    if (!button) {
      return;
    }
    selectedFuelType = button.dataset.fuelType;
    setFuelButtons(selectedFuelType);
  });

  [totalCostInput, litersInput].forEach((field) => {
    field?.addEventListener("input", updateUnitPrice);
    field?.addEventListener("change", updateUnitPrice);
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const record = buildDraftRecord();
    const nextRecords = editingRecord
      ? records.map((item) => (item.id === editingRecord.id ? record : item))
      : [record, ...records];
    const error = validate(record, nextRecords);

    if (error) {
      window.alert(error);
      return;
    }

    saveRecords(nextRecords);
    window.location.href = editingRecord ? "./logs.html?flash=updated" : "./logs.html?flash=saved";
  });

  setFuelButtons(selectedFuelType);
  updateUnitPrice();
}

function initStatsPage() {
  const records = loadRecords();
  const data = deriveData(records);
  const now = new Date();
  const daysElapsed = Math.max(1, now.getDate());
  const monthlySpend = data.monthly.totalSpend;
  const averageDaily = monthlySpend / daysElapsed;
  const fuelShare = monthlySpend > 0 ? 100 : 0;

  setText("statsMonthlySpend", formatNumber(monthlySpend, 2));
  setText("statsDailyAverage", formatNumber(averageDaily, 2));
  setText("statsMonthCompare", (() => {
    if (!data.previousMonthly.totalSpend && !monthlySpend) {
      return "0%";
    }
    if (!data.previousMonthly.totalSpend) {
      return "+100%";
    }
    const diff = ((monthlySpend - data.previousMonthly.totalSpend) / data.previousMonthly.totalSpend) * 100;
    const sign = diff > 0 ? "+" : "";
    return `${sign}${formatNumber(diff, 0)}%`;
  })());
  setText("statsFuelShare", `${formatNumber(fuelShare, 0)}%`);
  setText("statsFuelCount", `共计 ${data.monthly.count} 次`);
  setText("statsFuelAmount", formatNumber(monthlySpend, 2));
  setText("statsMaintenanceCount", "共计 0 次");
  setText("statsMaintenanceAmount", "0.00");
  setText("statsWashCount", "共计 0 次");
  setText("statsWashAmount", "0.00");
  setText("statsRepairCount", "共计 0 次");
  setText("statsRepairAmount", "0.00");
  setText("statsAccessoryCount", "暂无记录");
  setText("statsAccessoryAmount", "0.00");
  setText("statsDecorationCount", "共计 0 次");
  setText("statsDecorationAmount", "0.00");

  const primaryArc = document.getElementById("statsFuelArc");
  const secondaryArc = document.getElementById("statsOtherArc");
  if (primaryArc) {
    const offset = DONUT_CIRCUMFERENCE * (1 - fuelShare / 100);
    primaryArc.setAttribute("stroke-dasharray", String(DONUT_CIRCUMFERENCE));
    primaryArc.setAttribute("stroke-dashoffset", String(offset));
  }
  if (secondaryArc) {
    secondaryArc.setAttribute("stroke-dasharray", String(DONUT_CIRCUMFERENCE));
    secondaryArc.setAttribute("stroke-dashoffset", String(DONUT_CIRCUMFERENCE));
  }
}

function applyUnitToggleStyles(activeUnit) {
  document.querySelectorAll("[data-unit]").forEach((button) => {
    const isActive = button.dataset.unit === activeUnit;
    button.classList.add("toggle-pill");
    button.classList.toggle("toggle-pill--active", isActive);
    button.classList.toggle("toggle-pill--inactive", !isActive);
  });
}

function renderSettingsPage() {
  const settings = loadSettings();
  const records = loadRecords();

  setText("settingsCurrentCarName", settings.garage.current.name);
  setText("settingsCurrentCarPlate", settings.garage.current.plate);
  setText("settingsBackupCarName", settings.garage.backup.name);
  setText("settingsBackupCarMileage", `${formatNumber(settings.garage.backup.mileageKm, 2)} KM`);
  setText(
    "settingsLastSync",
    records[0] ? `最后同步: ${formatDateHeading(records[0].date)} ${formatTime(records[0].updatedAt || records[0].createdAt)}` : "最后同步: 暂无数据"
  );
  applyUnitToggleStyles(settings.unit);
}

function initSettingsPage() {
  const exportCard = document.getElementById("exportDataCard");
  const backupCard = document.getElementById("backupRestoreCard");
  const importInput = document.getElementById("backupImportInput");
  const currentCard = document.getElementById("currentCarCard");
  const backupCarCard = document.getElementById("backupCarCard");
  const addCarCard = document.getElementById("addCarCard");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const themeSwitchButton = document.getElementById("themeSwitchButton");

  renderSettingsPage();

  document.querySelector("[data-unit-group]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-unit]");
    if (!button) {
      return;
    }

    const settings = loadSettings();
    settings.unit = button.dataset.unit === "imperial" ? "imperial" : "metric";
    saveSettings(settings);
    renderSettingsPage();
  });

  currentCard?.addEventListener("click", () => {
    const settings = loadSettings();
    const nextName = window.prompt("编辑当前车辆名称", settings.garage.current.name);
    if (nextName === null) {
      return;
    }
    const nextPlate = window.prompt("编辑当前车辆牌照", settings.garage.current.plate);
    if (nextPlate === null) {
      return;
    }
    settings.garage.current.name = nextName.trim() || DEFAULT_SETTINGS.garage.current.name;
    settings.garage.current.plate = nextPlate.trim() || DEFAULT_SETTINGS.garage.current.plate;
    saveSettings(settings);
    renderSettingsPage();
  });

  backupCarCard?.addEventListener("click", () => {
    const settings = loadSettings();
    const nextName = window.prompt("编辑备用车辆名称", settings.garage.backup.name);
    if (nextName === null) {
      return;
    }
    const nextMileage = window.prompt("编辑备用车辆当前里程（KM）", String(settings.garage.backup.mileageKm));
    if (nextMileage === null) {
      return;
    }
    settings.garage.backup.name = nextName.trim() || DEFAULT_SETTINGS.garage.backup.name;
    settings.garage.backup.mileageKm = Math.max(0, asNumber(nextMileage));
    saveSettings(settings);
    renderSettingsPage();
  });

  addCarCard?.addEventListener("click", () => {
    const settings = loadSettings();
    const nextName = window.prompt("添加或替换备用车辆名称", settings.garage.backup.name || "");
    if (nextName === null) {
      return;
    }
    const nextMileage = window.prompt("输入备用车辆当前里程（KM）", String(settings.garage.backup.mileageKm || 0));
    if (nextMileage === null) {
      return;
    }
    settings.garage.backup = {
      name: nextName.trim() || DEFAULT_SETTINGS.garage.backup.name,
      mileageKm: Math.max(0, asNumber(nextMileage)),
    };
    saveSettings(settings);
    renderSettingsPage();
  });

  exportCard?.addEventListener("click", () => {
    const records = loadRecords();
    if (window.confirm("点击“确定”导出 CSV 报告，点击“取消”导出 JSON 报告。")) {
      downloadFile("jiageyouba-report.csv", toCsv(records), "text/csv;charset=utf-8");
      return;
    }

    downloadFile(
      "jiageyouba-report.json",
      JSON.stringify(
        {
          exportedAt: new Date().toISOString(),
          settings: loadSettings(),
          records,
        },
        null,
        2
      ),
      "application/json;charset=utf-8"
    );
  });

  backupCard?.addEventListener("click", () => {
    if (window.confirm("点击“确定”选择 JSON 备份文件导入，点击“取消”导出当前 JSON 备份。")) {
      importInput?.click();
      return;
    }

    downloadFile(
      "jiageyouba-backup.json",
      JSON.stringify(
        {
          exportedAt: new Date().toISOString(),
          settings: loadSettings(),
          records: loadRecords(),
        },
        null,
        2
      ),
      "application/json;charset=utf-8"
    );
  });

  importInput?.addEventListener("change", async () => {
    const file = importInput.files?.[0];
    if (!file) {
      return;
    }

    try {
      const payload = JSON.parse(await file.text());
      saveSettings({
        ...loadSettings(),
        ...(payload.settings || {}),
      });
      saveRecords(Array.isArray(payload.records) ? payload.records.map(normalizeRecord) : []);
      window.location.href = "./settings.html?flash=imported";
    } catch {
      window.alert("导入失败，请检查 JSON 备份文件。");
    } finally {
      importInput.value = "";
    }
  });

  darkModeToggle?.addEventListener("click", () => {
    window.alert("当前版本已固定为深色视觉，后续如需浅色版，建议单独设计一套主题。");
  });

  themeSwitchButton?.addEventListener("click", () => {
    window.alert("当前版本已固定为深色视觉，后续如需浅色版，建议单独设计一套主题。");
  });
}

function initPage() {
  registerServiceWorker();
  showFlash();

  switch (document.body.dataset.page) {
    case "dashboard":
      initDashboardPage();
      break;
    case "add":
      initAddPage();
      break;
    case "stats":
      initStatsPage();
      break;
    case "logs":
      renderHistoryList();
      break;
    case "settings":
      initSettingsPage();
      break;
    default:
      break;
  }
}

initPage();
