const DB_NAME = "jiageyouba-v34-db";
const DB_VERSION = 1;
const APP_SETTINGS_ID = "app";

const STORES = Object.freeze({
  meta: "meta",
  settings: "settings",
  vehicles: "vehicles",
  stations: "stations",
  records: "records",
});

const LEGACY_STORAGE_KEYS = Object.freeze({
  records: "jiageyouba:v34:records",
  settings: "jiageyouba:v34:settings",
});

const CATEGORY_ORDER = ["fuel", "maintenance", "wash", "repair", "accessory", "decoration"];
const NON_FUEL_KINDS = CATEGORY_ORDER.filter((kind) => kind !== "fuel");
const FUEL_TYPES = ["92#", "95#", "98#"];
const MILES_PER_KM = 0.621371;
const DONUT_CIRCUMFERENCE = 251.2;
const THEME_STORAGE_KEY = "jiageyouba:v35:theme";
const THEME_ORDER = ["dark", "light", "system"];
const MAX_MANAGED_VEHICLES = 2;
const APP_VERSION = "3.6.0";
const APP_CONFIG =
  typeof window === "undefined" ? {} : Object.freeze(window.__JIAGEYOUBA_CONFIG__ || {});
const APP_BASE_URL =
  typeof window === "undefined" ? new URL("https://example.invalid/") : new URL("./", window.location.href);
const LOCAL_SUPABASE_SCRIPT_URL = "./vendor/supabase-js.min.js";
const SUPABASE_URL = APP_CONFIG.supabaseUrl || "https://akjryomhmjdttxnevzxz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_9KnhgQT7Mzh5nMZMrCiSjg_pY0lEMgg";
const SUPABASE_REDIRECT_URL = APP_CONFIG.supabaseRedirectUrl || new URL("settings.html", APP_BASE_URL).toString();
const CLOUD_TABLE = "user_snapshots";
const CLOUD_SYNC_DEBOUNCE_MS = 500;
const CLOUD_REQUEST_TIMEOUT_MS = 8000;

const DEFAULT_VEHICLE_TEMPLATES = Object.freeze([
  {
    name: "保时捷 911 GT3",
    plate: "沪A · 911GT3",
    mileageKm: 12450,
  },
  {
    name: "路虎 卫士 110",
    plate: "",
    mileageKm: 4500.5,
  },
]);

const CLOUD_META_KEYS = Object.freeze({
  lastSyncedAt: "cloudLastSyncedAt",
  remoteUpdatedAt: "cloudLastRemoteUpdatedAt",
  userId: "cloudUserId",
});

const CATEGORY_META = Object.freeze({
  fuel: { label: "加油" },
  maintenance: { label: "保养" },
  wash: { label: "洗车" },
  repair: { label: "维修" },
  accessory: { label: "配件" },
  decoration: { label: "配饰" },
});

const NON_FUEL_FORM_META = Object.freeze({
  maintenance: {
    kicker: "SERVICE ENTRY",
    headingCreate: "记录本次保养",
    headingEdit: "编辑保养记录",
    amountLabel: "保养花费 (CNY)",
    titleLabel: "保养项目",
    titlePlaceholder: "例如 机油与机滤更换",
    notePlaceholder: "输入保养内容、品牌或店铺备注",
    defaultTitle: "常规保养",
  },
  wash: {
    kicker: "WASH ENTRY",
    headingCreate: "记录本次洗车",
    headingEdit: "编辑洗车记录",
    amountLabel: "洗车花费 (CNY)",
    titleLabel: "洗车项目",
    titlePlaceholder: "例如 精洗 / 内饰清洁",
    notePlaceholder: "输入洗车方式、店名或附加项目",
    defaultTitle: "车辆清洁",
  },
  repair: {
    kicker: "REPAIR ENTRY",
    headingCreate: "记录本次维修",
    headingEdit: "编辑维修记录",
    amountLabel: "维修花费 (CNY)",
    titleLabel: "维修项目",
    titlePlaceholder: "例如 刹车片 / 轮胎修补",
    notePlaceholder: "输入故障、部件或维修说明",
    defaultTitle: "维修处理",
  },
  accessory: {
    kicker: "PARTS ENTRY",
    headingCreate: "记录本次配件支出",
    headingEdit: "编辑配件记录",
    amountLabel: "配件花费 (CNY)",
    titleLabel: "配件名称",
    titlePlaceholder: "例如 雨刮器 / 脚垫",
    notePlaceholder: "输入品牌、型号或安装说明",
    defaultTitle: "车辆配件",
  },
  decoration: {
    kicker: "STYLE ENTRY",
    headingCreate: "记录本次配饰支出",
    headingEdit: "编辑配饰记录",
    amountLabel: "配饰花费 (CNY)",
    titleLabel: "配饰名称",
    titlePlaceholder: "例如 方向盘套 / 香氛",
    notePlaceholder: "输入配饰样式、颜色或购买说明",
    defaultTitle: "车辆配饰",
  },
});

const THEME_META = Object.freeze({
  dark: {
    label: "深色",
    hint: "保持当前深色视觉主题",
    icon: "dark_mode",
  },
  light: {
    label: "浅色",
    hint: "切换到单独适配的浅色主题",
    icon: "light_mode",
  },
  system: {
    label: "跟随系统",
    hint: "跟随系统自动切换视觉主题",
    icon: "brightness_auto",
  },
});

const FOOTER_QUOTES = Object.freeze({
  dashboard: [
    "路再远，也算数。",
    "把心放远一点。",
    "今天也向前开。",
    "出发就有答案。",
  ],
  add: [
    "补满能量，再把生活继续开远。",
    "认真记下一笔，后面的路会更清楚。",
    "每一次补给，都是下一段路的底气。",
    "加一点油，也给自己留一点余量。",
  ],
  stats: [
    "数字会说话。",
    "复盘让路更稳。",
    "把节奏握稳。",
    "趋势会留下痕迹。",
  ],
  logs: [
    "回头看过的每一程，都会帮你走稳下一程。",
    "历史不是堆叠，是长期习惯的轮廓。",
    "每一笔记录，都是和自己对齐的一次确认。",
    "路走过之后，最好还能留下清楚的坐标。",
  ],
  settings: [
    "车会陪你走很远，细节决定陪多久。",
    "把常用设置理顺，日常使用才会顺手。",
    "真正耐看的产品，通常也足够耐用。",
    "把基础打磨好，之后每次打开都会更舒服。",
  ],
});

const FLASH_MESSAGES = Object.freeze({
  saved: "记录已保存",
  updated: "记录已更新",
  imported: "备份已恢复",
  vehicleSwitched: "已切换当前驾驶车辆",
});

let databasePromise = null;
let toastTimer = 0;
let systemThemeWatcherBound = false;
let cloudSyncTimer = 0;

const cloudState = {
  client: null,
  session: null,
  user: null,
  authBound: false,
  libraryPromise: null,
  syncInFlight: false,
  syncQueued: false,
  lastError: "",
};

function createId(prefix = "id") {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function getToday(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(0, 0, 0, 0);
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 10);
}

function asNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function roundNumber(value, digits = 2) {
  return Number(asNumber(value).toFixed(digits));
}

function formatNumber(value, digits = 2) {
  return new Intl.NumberFormat("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(asNumber(value));
}

function withTimeout(promise, timeoutMs, message) {
  let timer = 0;
  const timeoutPromise = new Promise((_, reject) => {
    timer = window.setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    window.clearTimeout(timer);
  });
}

function getCloudUnavailableMessage(error) {
  const rawMessage = error instanceof Error ? error.message : String(error || "");
  if (
    rawMessage.includes(CLOUD_TABLE) ||
    rawMessage.includes("relation") ||
    rawMessage.includes("schema cache")
  ) {
    return "云同步表尚未初始化，请先执行 supabase/setup.sql";
  }

  if (
    rawMessage.includes("timeout") ||
    rawMessage.includes("超时") ||
    rawMessage.includes("Failed to fetch") ||
    rawMessage.includes("Load failed")
  ) {
    return "云同步网络较慢或暂不可用，当前保持本地模式";
  }

  return "云同步暂不可用，当前保持本地模式";
}

function setCloudError(error) {
  cloudState.lastError = getCloudUnavailableMessage(error);
}

function clearCloudError() {
  cloudState.lastError = "";
}

function formatInteger(value) {
  return new Intl.NumberFormat("zh-CN", {
    maximumFractionDigits: 0,
  }).format(asNumber(value));
}

function formatDateHeading(value) {
  if (!value) {
    return "--";
  }
  const [year = "--", month = "--", day = "--"] = String(value).split("-");
  return `${year}年${month}月${day}日`;
}

function formatTime(value) {
  if (!value) {
    return "--:--";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function monthKey(value) {
  return String(value || "").slice(0, 7);
}

function previousMonthKey(value) {
  const [yearText = "1970", monthText = "01"] = String(value || "").split("-");
  const date = new Date(Number(yearText), Number(monthText) - 2, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function getCategoryLabel(kind) {
  return CATEGORY_META[kind]?.label || CATEGORY_META.fuel.label;
}

function compareRecordsDesc(left, right) {
  if (left.date !== right.date) {
    return String(right.date).localeCompare(String(left.date));
  }
  return String(right.updatedAt || right.createdAt || "").localeCompare(String(left.updatedAt || left.createdAt || ""));
}

function compareRecordsChronological(left, right) {
  if (left.date !== right.date) {
    return String(left.date).localeCompare(String(right.date));
  }
  return String(left.createdAt || left.updatedAt || "").localeCompare(String(right.createdAt || right.updatedAt || ""));
}

function compareRecordsByOdometer(left, right) {
  if (left.odometerKm !== right.odometerKm) {
    return left.odometerKm - right.odometerKm;
  }
  return compareRecordsChronological(left, right);
}

function compareVehiclesByFreshness(left, right) {
  return String(right.updatedAt || right.createdAt || "").localeCompare(String(left.updatedAt || left.createdAt || ""));
}

function dedupeById(items) {
  const map = new Map();
  items.forEach((item) => {
    if (item?.id) {
      map.set(item.id, item);
    }
  });
  return [...map.values()];
}

function dedupeMeta(items) {
  const map = new Map();
  items.forEach((item) => {
    if (item?.key) {
      map.set(item.key, item);
    }
  });
  return [...map.values()];
}

function normalizeSettings(raw = {}) {
  const createdAt = raw.createdAt || nowIso();
  const updatedAt = raw.updatedAt || createdAt;
  const theme = THEME_ORDER.includes(raw.theme) ? raw.theme : "dark";

  return {
    id: APP_SETTINGS_ID,
    unit: raw.unit === "imperial" ? "imperial" : "metric",
    theme,
    currency: "CNY",
    activeVehicleId: String(raw.activeVehicleId || ""),
    createdAt,
    updatedAt,
  };
}

function normalizeVehicle(raw = {}) {
  const createdAt = raw.createdAt || nowIso();
  const updatedAt = raw.updatedAt || createdAt;

  return {
    id: String(raw.id || createId("vehicle")),
    name: String(raw.name || "未命名车辆"),
    plate: String(raw.plate || ""),
    mileageKm: Math.max(0, roundNumber(raw.mileageKm, 1)),
    isArchived: Boolean(raw.isArchived),
    createdAt,
    updatedAt,
  };
}

function normalizeStation(raw = {}) {
  const createdAt = raw.createdAt || nowIso();
  const updatedAt = raw.updatedAt || createdAt;

  return {
    id: String(raw.id || createId("station")),
    name: String(raw.name || ""),
    city: String(raw.city || ""),
    brand: String(raw.brand || ""),
    createdAt,
    updatedAt,
  };
}

function normalizeFuelPayload(raw = {}) {
  const liters = roundNumber(raw.liters, 2);
  const amount = asNumber(raw.amount ?? raw.totalCost);
  const unitPrice =
    raw.unitPrice !== undefined
      ? roundNumber(raw.unitPrice, 3)
      : liters > 0
        ? roundNumber(amount / liters, 3)
        : 0;

  return {
    liters,
    fuelType: FUEL_TYPES.includes(raw.fuelType) ? raw.fuelType : "95#",
    isFullTank: Boolean(raw.isFullTank),
    unitPrice,
    stationId: String(raw.stationId || ""),
  };
}

function normalizeRecord(raw = {}) {
  const createdAt = raw.createdAt || nowIso();
  const updatedAt = raw.updatedAt || createdAt;
  const kind = CATEGORY_ORDER.includes(raw.kind) ? raw.kind : "fuel";
  const amount = roundNumber(raw.amount ?? raw.totalCost, 2);
  const payload = kind === "fuel" ? normalizeFuelPayload(raw.payload || raw) : { ...(raw.payload || {}) };

  return {
    id: String(raw.id || createId("record")),
    vehicleId: String(raw.vehicleId || ""),
    stationId: String(raw.stationId || payload.stationId || ""),
    kind,
    date: String(raw.date || getToday()),
    amount,
    odometerKm: Math.max(0, roundNumber(raw.odometerKm ?? raw.odometer, 0)),
    title: String(raw.title || (kind === "fuel" ? `${payload.fuelType} 汽油` : getCategoryLabel(kind))),
    note: String(raw.note || ""),
    payload,
    createdAt,
    updatedAt,
  };
}

function createDefaultSnapshot() {
  const createdAt = nowIso();
  const [currentTemplate, backupTemplate] = DEFAULT_VEHICLE_TEMPLATES;
  const currentVehicle = normalizeVehicle({
    id: createId("vehicle"),
    ...currentTemplate,
    createdAt,
    updatedAt: createdAt,
  });
  const backupVehicle = normalizeVehicle({
    id: createId("vehicle"),
    ...backupTemplate,
    createdAt,
    updatedAt: createdAt,
  });

  return {
    settings: normalizeSettings({
      activeVehicleId: currentVehicle.id,
      createdAt,
      updatedAt: createdAt,
    }),
    vehicles: [currentVehicle, backupVehicle],
    stations: [],
    records: [],
    meta: [{ key: "bootstrappedAt", value: createdAt }],
  };
}

function normalizeSnapshot(snapshot = {}) {
  const defaults = createDefaultSnapshot();
  let vehicles = Array.isArray(snapshot.vehicles) ? snapshot.vehicles.map(normalizeVehicle) : [];
  let stations = Array.isArray(snapshot.stations) ? snapshot.stations.map(normalizeStation) : [];
  let records = Array.isArray(snapshot.records) ? snapshot.records.map(normalizeRecord) : [];
  let settings = normalizeSettings(snapshot.settings || defaults.settings);
  const meta = dedupeMeta([...(snapshot.meta || []), { key: "schemaVersion", value: String(DB_VERSION) }]);

  vehicles = dedupeById(vehicles);
  stations = dedupeById(stations);

  if (!vehicles.length) {
    vehicles = defaults.vehicles;
  }

  const vehicleIds = new Set(vehicles.map((vehicle) => vehicle.id));
  records = dedupeById(records)
    .filter((record) => vehicleIds.has(record.vehicleId))
    .sort(compareRecordsDesc);

  const mileageByVehicleId = new Map();
  records.forEach((record) => {
    if (record.odometerKm > 0) {
      mileageByVehicleId.set(record.vehicleId, Math.max(mileageByVehicleId.get(record.vehicleId) || 0, record.odometerKm));
    }
  });

  vehicles = vehicles
    .map((vehicle) =>
      normalizeVehicle({
        ...vehicle,
        mileageKm: Math.max(vehicle.mileageKm, mileageByVehicleId.get(vehicle.id) || 0),
      })
    )
    .sort(compareVehiclesByFreshness);

  if (!vehicles.some((vehicle) => vehicle.id === settings.activeVehicleId)) {
    settings = normalizeSettings({
      ...settings,
      activeVehicleId: vehicles[0]?.id || "",
      updatedAt: nowIso(),
    });
  }

  return {
    settings,
    vehicles,
    stations,
    records,
    meta,
  };
}

function getMetaValue(snapshot, key) {
  return snapshot?.meta?.find((entry) => entry?.key === key)?.value || "";
}

function upsertMetaEntries(entries = [], nextEntries = []) {
  const map = new Map();
  entries.forEach((entry) => {
    if (entry?.key) {
      map.set(entry.key, entry);
    }
  });
  nextEntries.forEach((entry) => {
    if (entry?.key) {
      map.set(entry.key, entry);
    }
  });
  return [...map.values()];
}

function withSnapshotMeta(snapshot, nextEntries = []) {
  return normalizeSnapshot({
    ...snapshot,
    meta: upsertMetaEntries(snapshot.meta || [], nextEntries),
  });
}

function cloneSnapshot(snapshot) {
  if (typeof structuredClone === "function") {
    return structuredClone(snapshot);
  }
  return JSON.parse(JSON.stringify(snapshot));
}

function getSnapshotLastUpdatedAt(snapshot) {
  const candidates = [
    snapshot?.settings?.updatedAt,
    getMetaValue(snapshot, "savedAt"),
  ]
    .concat((snapshot?.vehicles || []).map((vehicle) => vehicle.updatedAt))
    .concat((snapshot?.stations || []).map((station) => station.updatedAt))
    .concat((snapshot?.records || []).map((record) => record.updatedAt));

  return candidates.filter(Boolean).sort().at(-1) || "";
}

function isMeaningfulSnapshot(snapshot) {
  const normalized = normalizeSnapshot(snapshot);
  if (normalized.records.length > 0 || normalized.stations.length > 0) {
    return true;
  }

  if (normalized.settings.unit !== "metric" || normalized.settings.theme !== "dark") {
    return true;
  }

  if (normalized.vehicles.length !== DEFAULT_VEHICLE_TEMPLATES.length) {
    return true;
  }

  const firstVehicleId = normalized.vehicles[0]?.id || "";
  if (normalized.settings.activeVehicleId !== firstVehicleId) {
    return true;
  }

  return normalized.vehicles.some((vehicle, index) => {
    const template = DEFAULT_VEHICLE_TEMPLATES[index];
    if (!template) {
      return true;
    }
    return vehicle.name !== template.name || vehicle.plate !== template.plate || Math.abs(vehicle.mileageKm - template.mileageKm) > 0.01;
  });
}

function readLegacyJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function readLegacySnapshot() {
  const legacySettings = readLegacyJson(LEGACY_STORAGE_KEYS.settings, null);
  const legacyRecords = readLegacyJson(LEGACY_STORAGE_KEYS.records, null);
  const hasSettings = legacySettings && typeof legacySettings === "object" && Object.keys(legacySettings).length > 0;
  const hasRecords = Array.isArray(legacyRecords) && legacyRecords.length > 0;

  if (!hasSettings && !hasRecords) {
    return null;
  }

  return {
    settings: legacySettings || {},
    records: Array.isArray(legacyRecords) ? legacyRecords : [],
  };
}

function migrateLegacyPayload(payload = {}) {
  const defaults = createDefaultSnapshot();
  const legacySettings = payload.settings || {};
  const legacyCurrent = legacySettings.garage?.current || {};
  const legacyBackup = legacySettings.garage?.backup || {};

  const activeVehicle = normalizeVehicle({
    ...defaults.vehicles[0],
    name: legacyCurrent.name || defaults.vehicles[0].name,
    plate: legacyCurrent.plate || defaults.vehicles[0].plate,
  });

  const backupVehicle = normalizeVehicle({
    ...defaults.vehicles[1],
    name: legacyBackup.name || defaults.vehicles[1].name,
    plate: legacyBackup.plate || defaults.vehicles[1].plate,
    mileageKm: asNumber(legacyBackup.mileageKm || defaults.vehicles[1].mileageKm),
  });

  const records = (Array.isArray(payload.records) ? payload.records : []).map((legacyRecord) => {
    const fuelType = FUEL_TYPES.includes(legacyRecord.fuelType) ? legacyRecord.fuelType : "95#";
    return normalizeRecord({
      id: legacyRecord.id,
      vehicleId: activeVehicle.id,
      kind: "fuel",
      date: legacyRecord.date,
      amount: legacyRecord.totalCost,
      odometerKm: legacyRecord.odometer,
      title: `${fuelType} 汽油`,
      createdAt: legacyRecord.createdAt,
      updatedAt: legacyRecord.updatedAt,
      payload: {
        liters: legacyRecord.liters,
        fuelType,
        isFullTank: legacyRecord.isFullTank,
        unitPrice: legacyRecord.unitPrice,
      },
    });
  });

  return normalizeSnapshot({
    settings: {
      unit: legacySettings.unit,
      activeVehicleId: activeVehicle.id,
      createdAt: defaults.settings.createdAt,
      updatedAt: nowIso(),
    },
    vehicles: [activeVehicle, backupVehicle],
    stations: [],
    records,
    meta: [{ key: "legacyMigratedAt", value: nowIso() }],
  });
}

function normalizeImportedSnapshot(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("导入内容不是有效的 JSON 对象");
  }

  if (Array.isArray(payload.vehicles) || Array.isArray(payload.stations) || payload.settings?.activeVehicleId) {
    return validateManagedVehicleLimit(normalizeSnapshot(payload));
  }

  if (Array.isArray(payload.records)) {
    return validateManagedVehicleLimit(migrateLegacyPayload(payload));
  }

  throw new Error("备份文件格式不支持");
}

function validateManagedVehicleLimit(snapshot) {
  if (snapshot.vehicles.length > MAX_MANAGED_VEHICLES) {
    throw new Error(`当前版本最多支持 ${MAX_MANAGED_VEHICLES} 辆车，请精简后再导入`);
  }
  return snapshot;
}

function cleanupLegacyStorage() {
  try {
    window.localStorage.removeItem(LEGACY_STORAGE_KEYS.records);
    window.localStorage.removeItem(LEGACY_STORAGE_KEYS.settings);
  } catch {
    // Ignore cleanup failures.
  }
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}

function transactionToPromise(transaction) {
  return new Promise((resolve, reject) => {
    transaction.addEventListener("complete", () => resolve());
    transaction.addEventListener("error", () => reject(transaction.error));
    transaction.addEventListener("abort", () => reject(transaction.error || new Error("IndexedDB transaction aborted")));
  });
}

function openDatabase() {
  if (databasePromise) {
    return databasePromise;
  }

  databasePromise = new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("当前浏览器不支持 IndexedDB"));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.addEventListener("upgradeneeded", () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORES.meta)) {
        database.createObjectStore(STORES.meta, { keyPath: "key" });
      }

      if (!database.objectStoreNames.contains(STORES.settings)) {
        database.createObjectStore(STORES.settings, { keyPath: "id" });
      }

      if (!database.objectStoreNames.contains(STORES.vehicles)) {
        const vehiclesStore = database.createObjectStore(STORES.vehicles, { keyPath: "id" });
        vehiclesStore.createIndex("byUpdatedAt", "updatedAt", { unique: false });
      }

      if (!database.objectStoreNames.contains(STORES.stations)) {
        const stationsStore = database.createObjectStore(STORES.stations, { keyPath: "id" });
        stationsStore.createIndex("byName", "name", { unique: false });
      }

      if (!database.objectStoreNames.contains(STORES.records)) {
        const recordsStore = database.createObjectStore(STORES.records, { keyPath: "id" });
        recordsStore.createIndex("byVehicleId", "vehicleId", { unique: false });
        recordsStore.createIndex("byKind", "kind", { unique: false });
        recordsStore.createIndex("byDate", "date", { unique: false });
        recordsStore.createIndex("byUpdatedAt", "updatedAt", { unique: false });
      }
    });

    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });

  return databasePromise;
}

async function readRawSnapshot() {
  const database = await openDatabase();
  const transaction = database.transaction(Object.values(STORES), "readonly");

  const settingsPromise = requestToPromise(transaction.objectStore(STORES.settings).get(APP_SETTINGS_ID));
  const vehiclesPromise = requestToPromise(transaction.objectStore(STORES.vehicles).getAll());
  const stationsPromise = requestToPromise(transaction.objectStore(STORES.stations).getAll());
  const recordsPromise = requestToPromise(transaction.objectStore(STORES.records).getAll());
  const metaPromise = requestToPromise(transaction.objectStore(STORES.meta).getAll());

  const [settings, vehicles, stations, records, meta] = await Promise.all([
    settingsPromise,
    vehiclesPromise,
    stationsPromise,
    recordsPromise,
    metaPromise,
  ]);

  return {
    settings: settings || null,
    vehicles: Array.isArray(vehicles) ? vehicles : [],
    stations: Array.isArray(stations) ? stations : [],
    records: Array.isArray(records) ? records : [],
    meta: Array.isArray(meta) ? meta : [],
  };
}

async function saveSnapshot(snapshot, extraMeta = [], options = {}) {
  const nextSnapshot = normalizeSnapshot({
    ...snapshot,
    meta: [...(snapshot.meta || []), ...extraMeta, { key: "savedAt", value: nowIso() }],
  });
  const database = await openDatabase();
  const transaction = database.transaction(Object.values(STORES), "readwrite");

  Object.values(STORES).forEach((storeName) => {
    transaction.objectStore(storeName).clear();
  });

  transaction.objectStore(STORES.settings).put(nextSnapshot.settings);
  nextSnapshot.vehicles.forEach((vehicle) => transaction.objectStore(STORES.vehicles).put(vehicle));
  nextSnapshot.stations.forEach((station) => transaction.objectStore(STORES.stations).put(station));
  nextSnapshot.records.forEach((record) => transaction.objectStore(STORES.records).put(record));
  nextSnapshot.meta.forEach((entry) => transaction.objectStore(STORES.meta).put(entry));

  await transactionToPromise(transaction);
  if (!options.skipCloud) {
    scheduleCloudSync("local-save");
  }
  return nextSnapshot;
}

async function bootstrapDatabase() {
  const raw = await readRawSnapshot();
  if (raw.settings && raw.vehicles.length > 0) {
    return;
  }

  const legacy = readLegacySnapshot();
  const snapshot = legacy ? migrateLegacyPayload(legacy) : createDefaultSnapshot();
  await saveSnapshot(snapshot, [
    {
      key: legacy ? "legacyBootstrappedAt" : "bootstrappedAt",
      value: nowIso(),
    },
  ], { skipCloud: true });

  if (legacy) {
    cleanupLegacyStorage();
  }
}

async function loadSnapshot() {
  return normalizeSnapshot(await readRawSnapshot());
}

function getCloudSnapshotPayload(snapshot) {
  const nextSnapshot = cloneSnapshot(normalizeSnapshot(snapshot));
  nextSnapshot.meta = (nextSnapshot.meta || []).filter((entry) => !Object.values(CLOUD_META_KEYS).includes(entry.key));
  return nextSnapshot;
}

function applyCloudMeta(snapshot, userId, remoteUpdatedAt) {
  return withSnapshotMeta(snapshot, [
    { key: CLOUD_META_KEYS.lastSyncedAt, value: nowIso() },
    { key: CLOUD_META_KEYS.remoteUpdatedAt, value: remoteUpdatedAt || nowIso() },
    { key: CLOUD_META_KEYS.userId, value: userId || "" },
  ]);
}

function shouldPullRemoteSnapshot(localSnapshot, remoteSnapshot, remoteUpdatedAt, userId) {
  const remoteMeaningful = isMeaningfulSnapshot(remoteSnapshot);
  if (!remoteMeaningful) {
    return false;
  }

  const localMeaningful = isMeaningfulSnapshot(localSnapshot);
  if (!localMeaningful) {
    return true;
  }

  const knownUserId = getMetaValue(localSnapshot, CLOUD_META_KEYS.userId);
  if (knownUserId && knownUserId !== userId) {
    return true;
  }

  const localBaseline = getMetaValue(localSnapshot, CLOUD_META_KEYS.remoteUpdatedAt) || getSnapshotLastUpdatedAt(localSnapshot);
  const remoteBaseline = remoteUpdatedAt || getSnapshotLastUpdatedAt(remoteSnapshot);
  return remoteBaseline > localBaseline;
}

function shouldPushLocalSnapshot(localSnapshot, remoteEnvelope, userId) {
  if (!isMeaningfulSnapshot(localSnapshot)) {
    return false;
  }

  const knownUserId = getMetaValue(localSnapshot, CLOUD_META_KEYS.userId);
  if (knownUserId && knownUserId !== userId) {
    return false;
  }

  if (!remoteEnvelope) {
    return true;
  }

  const remoteSnapshot = normalizeSnapshot(remoteEnvelope.snapshot || {});
  if (!isMeaningfulSnapshot(remoteSnapshot)) {
    return true;
  }

  const knownRemoteUpdatedAt = getMetaValue(localSnapshot, CLOUD_META_KEYS.remoteUpdatedAt);
  const localUpdatedAt = getSnapshotLastUpdatedAt(localSnapshot);
  const remoteUpdatedAt = remoteEnvelope.updatedAt || getSnapshotLastUpdatedAt(remoteSnapshot);

  if (knownRemoteUpdatedAt && remoteUpdatedAt === knownRemoteUpdatedAt) {
    return localUpdatedAt > knownRemoteUpdatedAt;
  }

  return localUpdatedAt > remoteUpdatedAt;
}

async function ensureSupabaseLibrary() {
  if (typeof window === "undefined") {
    return false;
  }

  if (typeof window.supabase?.createClient === "function") {
    clearCloudError();
    return true;
  }

  if (!cloudState.libraryPromise) {
    cloudState.libraryPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${LOCAL_SUPABASE_SCRIPT_URL}"]`);
      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(true), { once: true });
        existingScript.addEventListener("error", () => reject(new Error("云同步组件加载失败")), {
          once: true,
        });
        return;
      }

      const script = document.createElement("script");
      script.src = LOCAL_SUPABASE_SCRIPT_URL;
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("云同步组件加载失败"));
      document.head.appendChild(script);
    }).catch((error) => {
      cloudState.libraryPromise = null;
      setCloudError(error);
      throw error;
    });
  }

  await withTimeout(cloudState.libraryPromise, CLOUD_REQUEST_TIMEOUT_MS, "云同步组件加载超时");
  clearCloudError();
  return true;
}

async function ensureSupabaseClient() {
  if (cloudState.client) {
    return cloudState.client;
  }

  if (typeof window === "undefined") {
    return null;
  }

  await ensureSupabaseLibrary();

  cloudState.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  if (!cloudState.authBound) {
    cloudState.authBound = true;
    cloudState.client.auth.onAuthStateChange((event, session) => {
      cloudState.session = session || null;
      cloudState.user = session?.user || null;

      window.setTimeout(() => {
        void renderCloudAuthState();

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
          void syncCloudSnapshot({ reason: `auth:${event.toLowerCase()}`, silent: true });
        }
      }, 0);
    });
  }

  const { data, error } = await withTimeout(
    cloudState.client.auth.getSession(),
    CLOUD_REQUEST_TIMEOUT_MS,
    "云同步会话获取超时"
  );
  if (error) {
    setCloudError(error);
    throw error;
  }

  cloudState.session = data.session || null;
  cloudState.user = data.session?.user || null;
  clearCloudError();
  return cloudState.client;
}

async function fetchRemoteSnapshotEnvelope(client) {
  const { data, error } = await withTimeout(
    client.from(CLOUD_TABLE).select("snapshot, updated_at").maybeSingle(),
    CLOUD_REQUEST_TIMEOUT_MS,
    "云同步读取超时"
  );

  if (error) {
    setCloudError(error);
    throw error;
  }

  if (!data) {
    return null;
  }

  clearCloudError();
  return {
    snapshot: normalizeSnapshot(data.snapshot || {}),
    updatedAt: String(data.updated_at || ""),
  };
}

async function renderCloudAuthState(snapshot = null) {
  const statusElement = document.getElementById("cloudAuthStatus");
  if (!statusElement) {
    return;
  }

  const hintElement = document.getElementById("cloudAuthHint");
  const syncElement = document.getElementById("cloudLastSyncStatus");
  const modeElement = document.getElementById("cloudModeStatus");
  const emailInput = document.getElementById("cloudEmail");
  const passwordInput = document.getElementById("cloudPassword");
  const signUpButton = document.getElementById("cloudSignUpButton");
  const signInButton = document.getElementById("cloudSignInButton");
  const syncButton = document.getElementById("cloudSyncButton");
  const signOutButton = document.getElementById("cloudSignOutButton");
  const nextSnapshot = snapshot || (await loadSnapshot());
  const userEmail = cloudState.user?.email || "";

  if (emailInput && userEmail) {
    emailInput.value = userEmail;
  }

  const isSignedIn = Boolean(cloudState.user);
  const lastSyncedAt = getMetaValue(nextSnapshot, CLOUD_META_KEYS.lastSyncedAt);
  const isCloudDegraded = Boolean(cloudState.lastError);

  statusElement.textContent = isSignedIn ? `已登录：${userEmail}` : "未登录云同步";
  if (hintElement) {
    hintElement.textContent = isCloudDegraded
      ? cloudState.lastError
      : isSignedIn
        ? "当前账号已连接，可在重装 PWA 后恢复这套数据"
        : "登录后可在重装 PWA 后恢复车辆与记录";
  }

  if (syncElement) {
    if (cloudState.syncInFlight) {
      syncElement.textContent = "最近云同步：同步进行中…";
    } else if (lastSyncedAt) {
      syncElement.textContent = `最近云同步：${formatDateHeading(String(lastSyncedAt).slice(0, 10))} ${formatTime(lastSyncedAt)}`;
    } else {
      syncElement.textContent = "最近云同步：未开始";
    }
  }

  if (modeElement) {
    modeElement.dataset.state = isCloudDegraded ? "degraded" : isSignedIn ? "connected" : "local";
    modeElement.textContent = isCloudDegraded
      ? "当前模式：本地模式"
      : isSignedIn
        ? "当前模式：云同步已连接"
        : "当前模式：本地优先";
  }

  if (emailInput) {
    emailInput.disabled = isSignedIn;
  }
  if (passwordInput) {
    passwordInput.disabled = isSignedIn;
  }
  if (signUpButton) {
    signUpButton.disabled = isSignedIn || cloudState.syncInFlight;
  }
  if (signInButton) {
    signInButton.disabled = isSignedIn || cloudState.syncInFlight;
  }
  if (syncButton) {
    syncButton.disabled = !isSignedIn || cloudState.syncInFlight;
  }
  if (signOutButton) {
    signOutButton.disabled = !isSignedIn || cloudState.syncInFlight;
  }
}

function scheduleCloudSync(reason, options = {}) {
  window.clearTimeout(cloudSyncTimer);
  cloudSyncTimer = window.setTimeout(() => {
    void syncCloudSnapshot({
      reason,
      silent: options.silent !== false,
    });
  }, options.immediate ? 0 : CLOUD_SYNC_DEBOUNCE_MS);
}

async function syncCloudSnapshot(options = {}) {
  const client = await ensureSupabaseClient().catch((error) => {
    console.error(error);
    setCloudError(error);
    return null;
  });

  if (!client || !cloudState.user) {
    await renderCloudAuthState();
    return null;
  }

  if (cloudState.syncInFlight) {
    cloudState.syncQueued = true;
    return null;
  }

  cloudState.syncInFlight = true;
  await renderCloudAuthState();

  try {
    let localSnapshot = await loadSnapshot();
    const remoteEnvelope = await fetchRemoteSnapshotEnvelope(client);
    const userId = cloudState.user.id;

    if (remoteEnvelope && shouldPullRemoteSnapshot(localSnapshot, remoteEnvelope.snapshot, remoteEnvelope.updatedAt, userId)) {
      const pulledSnapshot = applyCloudMeta(remoteEnvelope.snapshot, userId, remoteEnvelope.updatedAt);
      const savedSnapshot = await saveSnapshot(pulledSnapshot, [], { skipCloud: true });
      await renderCloudAuthState(savedSnapshot);
      return savedSnapshot;
    }

    if (!shouldPushLocalSnapshot(localSnapshot, remoteEnvelope, userId)) {
      await renderCloudAuthState(localSnapshot);
      return localSnapshot;
    }

    const payload = {
      user_id: userId,
      snapshot: getCloudSnapshotPayload(localSnapshot),
      schema_version: DB_VERSION,
      app_version: APP_VERSION,
    };

    const { data, error } = await withTimeout(
      client.from(CLOUD_TABLE).upsert(payload, { onConflict: "user_id" }).select("updated_at").single(),
      CLOUD_REQUEST_TIMEOUT_MS,
      "云同步写入超时"
    );

    if (error) {
      setCloudError(error);
      throw error;
    }

    clearCloudError();
    localSnapshot = applyCloudMeta(localSnapshot, userId, String(data?.updated_at || nowIso()));
    const savedSnapshot = await saveSnapshot(localSnapshot, [], { skipCloud: true });
    await renderCloudAuthState(savedSnapshot);

    if (!options.silent) {
      showToast("云同步已完成");
    }

    return savedSnapshot;
  } catch (error) {
    console.error(error);
    setCloudError(error);
    if (!options.silent) {
      showToast(getCloudUnavailableMessage(error), "warning");
    }
    return null;
  } finally {
    cloudState.syncInFlight = false;
    await renderCloudAuthState();
    if (cloudState.syncQueued) {
      cloudState.syncQueued = false;
      scheduleCloudSync("queued-sync");
    }
  }
}

function getVehicleMap(snapshot) {
  return new Map(snapshot.vehicles.map((vehicle) => [vehicle.id, vehicle]));
}

function getActiveVehicle(snapshot) {
  return snapshot.vehicles.find((vehicle) => vehicle.id === snapshot.settings.activeVehicleId) || snapshot.vehicles[0] || null;
}

function getSecondaryVehicle(snapshot) {
  const activeVehicle = getActiveVehicle(snapshot);
  return snapshot.vehicles.find((vehicle) => vehicle.id !== activeVehicle?.id) || null;
}

function getRecordsForVehicle(snapshot, vehicleId) {
  return snapshot.records.filter((record) => record.vehicleId === vehicleId).sort(compareRecordsDesc);
}

function getFuelRecords(records) {
  return records.filter((record) => record.kind === "fuel");
}

function getFuelPayload(record) {
  return normalizeFuelPayload(record.payload || {});
}

function buildFuelEfficiencySeries(records) {
  const ordered = getFuelRecords(records)
    .filter((record) => record.odometerKm > 0 && getFuelPayload(record).liters > 0)
    .sort(compareRecordsByOdometer);

  const series = [];
  let anchor = null;
  let litersSinceAnchor = 0;

  ordered.forEach((record) => {
    const payload = getFuelPayload(record);

    if (!anchor) {
      if (payload.isFullTank) {
        anchor = record;
      }
      return;
    }

    if (record.odometerKm <= anchor.odometerKm) {
      if (payload.isFullTank) {
        anchor = record;
        litersSinceAnchor = 0;
      }
      return;
    }

    litersSinceAnchor += payload.liters;

    if (!payload.isFullTank) {
      return;
    }

    const distanceKm = record.odometerKm - anchor.odometerKm;
    const litersPer100Km = distanceKm > 0 ? (litersSinceAnchor * 100) / distanceKm : 0;

    if (litersPer100Km > 1 && litersPer100Km < 30) {
      series.push({
        recordId: record.id,
        date: record.date,
        litersPer100Km,
        distanceKm,
      });
    }

    anchor = record;
    litersSinceAnchor = 0;
  });

  return series;
}

function getDistanceCoverage(records) {
  const odometers = records.map((record) => record.odometerKm).filter((value) => value > 0);
  if (odometers.length < 2) {
    return 0;
  }
  return Math.max(...odometers) - Math.min(...odometers);
}

function sumAmounts(records) {
  return records.reduce((sum, record) => sum + asNumber(record.amount), 0);
}

function summarizeByKind(records) {
  return CATEGORY_ORDER.reduce((summary, kind) => {
    const scoped = records.filter((record) => record.kind === kind);
    summary[kind] = {
      count: scoped.length,
      amount: sumAmounts(scoped),
    };
    return summary;
  }, {});
}

function getMonthScopedRecords(records, targetMonth) {
  return records.filter((record) => monthKey(record.date) === targetMonth);
}

function getVehicleAnalytics(snapshot, vehicleId) {
  const vehicleRecords = getRecordsForVehicle(snapshot, vehicleId);
  const currentMonth = monthKey(getToday());
  const previousMonth = previousMonthKey(currentMonth);
  const fuelSeries = buildFuelEfficiencySeries(vehicleRecords);
  const currentFuelSeries = fuelSeries.filter((item) => monthKey(item.date) === currentMonth);
  const previousFuelSeries = fuelSeries.filter((item) => monthKey(item.date) === previousMonth);

  return {
    allRecords: vehicleRecords,
    currentMonthRecords: getMonthScopedRecords(vehicleRecords, currentMonth),
    previousMonthRecords: getMonthScopedRecords(vehicleRecords, previousMonth),
    fuelSeries,
    currentFuelSeries,
    previousFuelSeries,
    efficiencyByRecordId: new Map(fuelSeries.map((item) => [item.recordId, item.litersPer100Km])),
  };
}

function averageEfficiency(series) {
  if (!series.length) {
    return 0;
  }
  return series.reduce((sum, item) => sum + item.litersPer100Km, 0) / series.length;
}

function formatDistanceValue(kilometers, unitMode, digits = 0) {
  if (unitMode === "imperial") {
    return formatNumber(kilometers * MILES_PER_KM, digits);
  }
  return digits === 0 ? formatInteger(kilometers) : formatNumber(kilometers, digits);
}

function formatDistanceUnit(unitMode) {
  return unitMode === "imperial" ? "英里" : "公里";
}

function formatCompactEfficiency(litersPer100Km, unitMode) {
  if (!litersPer100Km) {
    return "--";
  }

  if (unitMode === "imperial") {
    return `${formatNumber(235.214583 / litersPer100Km, 1)} MPG`;
  }

  return `${formatNumber(litersPer100Km, 1)} L/100`;
}

function formatDetailedEfficiency(litersPer100Km, unitMode) {
  if (!litersPer100Km) {
    return "--";
  }

  if (unitMode === "imperial") {
    return `${formatNumber(235.214583 / litersPer100Km, 1)} MPG`;
  }

  return `${formatNumber(litersPer100Km, 1)} L/100KM`;
}

function getMonthDeltaLabel(currentValue, previousValue) {
  if (!currentValue && !previousValue) {
    return "较上月暂无变化";
  }

  if (!previousValue) {
    return "较上月新增";
  }

  const diff = ((currentValue - previousValue) / previousValue) * 100;
  if (Math.abs(diff) < 1) {
    return "较上月持平";
  }
  return diff > 0 ? `较上月增长 ${formatNumber(Math.abs(diff), 0)}%` : `较上月下降 ${formatNumber(Math.abs(diff), 0)}%`;
}

function getMonthCompareValue(currentValue, previousValue) {
  if (!currentValue && !previousValue) {
    return { text: "0%", diff: 0 };
  }

  if (!previousValue) {
    return { text: "+100%", diff: 100 };
  }

  const diff = ((currentValue - previousValue) / previousValue) * 100;
  const sign = diff > 0 ? "+" : "";
  return {
    text: `${sign}${formatNumber(diff, 0)}%`,
    diff,
  };
}

function getCategoryCountLabel(count) {
  return count > 0 ? `共计 ${count} 次` : "暂无记录";
}

function isNonFuelKind(kind) {
  return NON_FUEL_KINDS.includes(kind);
}

function getNonFuelFormMeta(kind) {
  return NON_FUEL_FORM_META[kind] || NON_FUEL_FORM_META.maintenance;
}

function readCachedThemeMode() {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return THEME_ORDER.includes(raw) ? raw : "dark";
  } catch {
    return "dark";
  }
}

function writeCachedThemeMode(themeMode) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
  } catch {
    // Ignore cache write failures.
  }
}

function getSystemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function resolveTheme(themeMode) {
  return themeMode === "system" ? getSystemTheme() : themeMode;
}

function syncThemeButtons(themeMode) {
  const iconName = THEME_META[themeMode]?.icon || THEME_META.dark.icon;
  [
    "dashboardThemeHint",
    "addThemeHint",
    "statsThemeHint",
    "logsThemeHint",
    "darkModeToggle",
  ].forEach((id) => {
    const button = document.getElementById(id);
    if (!button) {
      return;
    }

    const icon = button.querySelector(".material-symbols-outlined") || button;
    icon.textContent = iconName;
    icon.dataset.icon = iconName;
  });
}

function applyTheme(themeMode) {
  const root = document.documentElement;
  const effectiveTheme = resolveTheme(themeMode);
  root.classList.remove("light", "dark");
  root.classList.add(effectiveTheme);
  root.dataset.themeMode = themeMode;

  const themeColorMeta = document.getElementById("themeColorMeta");
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", effectiveTheme === "light" ? "#f4f5ef" : "#0e0e0e");
  }

  writeCachedThemeMode(themeMode);
  syncThemeButtons(themeMode);
}

function bindSystemThemeWatcher() {
  if (systemThemeWatcherBound || !window.matchMedia) {
    return;
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = () => {
    if ((document.documentElement.dataset.themeMode || readCachedThemeMode()) === "system") {
      applyTheme("system");
    }
  };

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", handleChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(handleChange);
  }

  systemThemeWatcherBound = true;
}

function applyThemeToggleStyles(activeTheme) {
  document.querySelectorAll("[data-theme]").forEach((button) => {
    const isActive = button.dataset.theme === activeTheme;
    button.classList.add("toggle-pill");
    button.classList.toggle("toggle-pill--active", isActive);
    button.classList.toggle("toggle-pill--inactive", !isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function getThemeHint(themeMode) {
  return THEME_META[themeMode]?.hint || THEME_META.dark.hint;
}

function cycleThemeMode(themeMode) {
  const index = THEME_ORDER.indexOf(themeMode);
  return THEME_ORDER[(index + 1 + THEME_ORDER.length) % THEME_ORDER.length];
}

function renderFooterQuote(page) {
  const quoteMap = {
    dashboard: "dashboardFooterQuote",
    add: "addFooterQuote",
    stats: "statsFooterQuote",
    logs: "logsFooterQuote",
    settings: "settingsFooterQuote",
  };

  const targetId = quoteMap[page];
  const quotes = FOOTER_QUOTES[page];
  const element = targetId ? document.getElementById(targetId) : null;

  if (!element || !quotes?.length) {
    return;
  }

  const sessionKey = `${THEME_STORAGE_KEY}:quote:${page}`;
  const previous = window.sessionStorage.getItem(sessionKey);
  let nextQuote = quotes[Math.floor(Math.random() * quotes.length)];

  if (quotes.length > 1 && nextQuote === previous) {
    nextQuote = quotes[(quotes.indexOf(nextQuote) + 1) % quotes.length];
  }

  element.textContent = nextQuote;
  window.sessionStorage.setItem(sessionKey, nextQuote);
}

function showToast(message, tone = "default") {
  if (!message) {
    return;
  }

  let root = document.getElementById("appToastRoot");
  if (!root) {
    root = document.createElement("div");
    root.id = "appToastRoot";
    root.className = "app-toast-root";
    root.innerHTML = '<div id="appToast" class="app-toast" role="status" aria-live="polite"></div>';
    document.body.append(root);
  }

  const toast = document.getElementById("appToast");
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.className = `app-toast app-toast--visible${tone === "warning" ? " app-toast--warning" : ""}`;

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.className = "app-toast";
  }, 2400);
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
  if (!flash || !FLASH_MESSAGES[flash]) {
    return;
  }

  window.setTimeout(() => showToast(FLASH_MESSAGES[flash]), 60);
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

function toCsv(snapshot) {
  const vehicleMap = getVehicleMap(snapshot);
  const header = [
    "id",
    "kind",
    "vehicleName",
    "vehiclePlate",
    "date",
    "amount",
    "odometerKm",
    "liters",
    "fuelType",
    "isFullTank",
    "title",
    "note",
    "createdAt",
    "updatedAt",
  ];

  const rows = snapshot.records.map((record) => {
    const vehicle = vehicleMap.get(record.vehicleId);
    const payload = record.kind === "fuel" ? getFuelPayload(record) : {};
    return [
      record.id,
      record.kind,
      vehicle?.name || "",
      vehicle?.plate || "",
      record.date,
      record.amount,
      record.odometerKm,
      payload.liters ?? "",
      payload.fuelType ?? "",
      payload.isFullTank ?? "",
      record.title,
      record.note,
      record.createdAt,
      record.updatedAt,
    ];
  });

  return [header, ...rows]
    .map((row) =>
      row
        .map((cell) => {
          const text = String(cell ?? "");
          return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
        })
        .join(",")
    )
    .join("\r\n")
    .replace(/^/, "\uFEFF");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

function bindThemeEntryPoints() {
  ["dashboardThemeHint", "addThemeHint", "statsThemeHint", "logsThemeHint"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => {
      window.location.href = "./settings.html#themePreferences";
    });
  });
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

function applyUnitToggleStyles(activeUnit) {
  document.querySelectorAll("[data-unit]").forEach((button) => {
    const isActive = button.dataset.unit === activeUnit;
    button.classList.add("toggle-pill");
    button.classList.toggle("toggle-pill--active", isActive);
    button.classList.toggle("toggle-pill--inactive", !isActive);
  });
}

function setRecordKindButtons(activeKind) {
  document.querySelectorAll("[data-record-kind]").forEach((button) => {
    const isActive = button.dataset.recordKind === activeKind;
    button.classList.add("fuel-option");
    button.classList.toggle("fuel-option--active", isActive);
    button.classList.toggle("fuel-option--inactive", !isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function validateOdometerSequence(records, candidateRecord) {
  const ordered = records
    .filter((record) => record.vehicleId === candidateRecord.vehicleId && record.id !== candidateRecord.id && record.odometerKm > 0)
    .concat(candidateRecord)
    .sort(compareRecordsChronological);

  const index = ordered.findIndex((record) => record.id === candidateRecord.id);
  const previous = index > 0 ? ordered[index - 1] : null;
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null;

  if (previous && candidateRecord.odometerKm < previous.odometerKm) {
    return `当前里程不能小于上一条记录（${formatDateHeading(previous.date)}，${formatInteger(previous.odometerKm)} KM）`;
  }

  if (next && candidateRecord.odometerKm > next.odometerKm) {
    return `当前里程不能大于下一条记录（${formatDateHeading(next.date)}，${formatInteger(next.odometerKm)} KM）`;
  }

  return "";
}

function renderDashboardPage(snapshot) {
  const activeVehicle = getActiveVehicle(snapshot);
  if (!activeVehicle) {
    return;
  }

  const unitMode = snapshot.settings.unit;
  const analytics = getVehicleAnalytics(snapshot, activeVehicle.id);
  const monthlySpend = sumAmounts(analytics.currentMonthRecords);
  const previousMonthlySpend = sumAmounts(analytics.previousMonthRecords);
  const monthlyDistance = getDistanceCoverage(analytics.currentMonthRecords);
  const monthlyAvgEfficiency = averageEfficiency(analytics.currentFuelSeries);

  setText("dashboardMonthlySpend", formatNumber(monthlySpend, 2));
  setText("dashboardMonthlyDelta", getMonthDeltaLabel(monthlySpend, previousMonthlySpend));
  setText("dashboardMonthlyMileage", formatDistanceValue(monthlyDistance, unitMode, 0));
  setText("dashboardMileageUnit", formatDistanceUnit(unitMode));
  setText("dashboardAvgEfficiency", formatCompactEfficiency(monthlyAvgEfficiency, unitMode));
  setText("dashboardCurrentCarName", activeVehicle.name);
}

function buildEmptyHistoryMarkup() {
  return `
    <div class="group">
      <div class="bg-surface-container rounded-lg p-6">
        <p class="font-headline text-white font-bold text-lg">还没有记录</p>
        <p class="font-body text-sm text-on-surface-variant mt-2">先去“记录”页添加第一条数据，趋势和历史会自动生成。</p>
        <a class="inline-block mt-5 px-4 py-2 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-sm" href="./add.html">去记录</a>
      </div>
    </div>
  `;
}

function getHistoryCardMetrics(record, efficiencyByRecordId, unitMode) {
  if (record.kind === "fuel") {
    const payload = getFuelPayload(record);
    return {
      leftLabel: "油耗",
      leftValue: formatDetailedEfficiency(efficiencyByRecordId.get(record.id) || 0, unitMode),
      middleLabel: "当前里程",
      middleValue: record.odometerKm > 0 ? `${formatDistanceValue(record.odometerKm, unitMode, 0)} ${unitMode === "imperial" ? "MI" : "KM"}` : "--",
      rightLabel: "加油量",
      rightValue: `${formatNumber(payload.liters, 2)} L`,
    };
  }

  return {
    leftLabel: "记录类型",
    leftValue: getCategoryLabel(record.kind),
    middleLabel: "当前里程",
    middleValue: record.odometerKm > 0 ? `${formatDistanceValue(record.odometerKm, unitMode, 0)} ${unitMode === "imperial" ? "MI" : "KM"}` : "--",
    rightLabel: record.note ? "备注" : "项目",
    rightValue: record.note || record.title || "--",
  };
}

function renderHistoryList(snapshot) {
  const list = document.getElementById("historyList");
  const activeVehicle = getActiveVehicle(snapshot);
  if (!list || !activeVehicle) {
    return;
  }

  const unitMode = snapshot.settings.unit;
  const analytics = getVehicleAnalytics(snapshot, activeVehicle.id);
  const vehicleMap = getVehicleMap(snapshot);

  setText("logsTotalSpend", formatNumber(sumAmounts(analytics.allRecords), 2));

  if (!analytics.allRecords.length) {
    list.innerHTML = buildEmptyHistoryMarkup();
    return;
  }

  list.innerHTML = analytics.allRecords
    .map((record) => {
      const vehicle = vehicleMap.get(record.vehicleId);
      const metrics = getHistoryCardMetrics(record, analytics.efficiencyByRecordId, unitMode);
      return `
        <div class="group">
          <div class="flex justify-between items-end mb-4">
            <h2 class="font-headline text-on-surface font-medium text-[1.25rem]">${escapeHtml(formatDateHeading(record.date))}</h2>
            <span class="font-label text-on-surface-variant text-[0.75rem] font-bold tracking-wider">${escapeHtml(formatTime(record.updatedAt || record.createdAt))}</span>
          </div>
          <button class="app-card-button bg-surface-container rounded-lg p-6 transition-all duration-300 active:scale-[0.98] active:bg-surface-container-high cursor-pointer" data-record-id="${escapeHtml(record.id)}" type="button">
            <div class="flex justify-between items-start mb-6">
              <div>
                <p class="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-tighter mb-1">记录车辆</p>
                <p class="font-headline text-white font-bold text-lg">${escapeHtml(vehicle?.plate || vehicle?.name || "未命名车辆")}</p>
              </div>
              <div class="text-right">
                <p class="font-label text-on-surface-variant text-[0.7rem] uppercase tracking-tighter mb-1">实付金额</p>
                <p class="font-headline text-primary-fixed font-bold text-xl">${escapeHtml(formatNumber(record.amount, 2))}</p>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-outline-variant/10">
              <div>
                <p class="font-label text-on-surface-variant text-[0.65rem] uppercase mb-1">${escapeHtml(metrics.leftLabel)}</p>
                <p class="font-headline text-white text-[0.9rem] font-medium">${escapeHtml(metrics.leftValue)}</p>
              </div>
              <div>
                <p class="font-label text-on-surface-variant text-[0.65rem] uppercase mb-1">${escapeHtml(metrics.middleLabel)}</p>
                <p class="font-headline text-white text-[0.9rem] font-medium">${escapeHtml(metrics.middleValue)}</p>
              </div>
              <div class="text-right">
                <p class="font-label text-on-surface-variant text-[0.65rem] uppercase mb-1">${escapeHtml(metrics.rightLabel)}</p>
                <p class="font-headline text-white text-[0.9rem] font-medium">${escapeHtml(metrics.rightValue)}</p>
              </div>
            </div>
          </button>
        </div>
      `;
    })
    .join("");

  const recordMap = new Map(analytics.allRecords.map((record) => [record.id, record]));
  list.querySelectorAll("[data-record-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const record = recordMap.get(button.dataset.recordId || "");
      if (!record) {
        return;
      }

      window.location.href = `./add.html?id=${encodeURIComponent(record.id)}`;
    });
  });
}

function renderStatsPage(snapshot) {
  const activeVehicle = getActiveVehicle(snapshot);
  if (!activeVehicle) {
    return;
  }

  const analytics = getVehicleAnalytics(snapshot, activeVehicle.id);
  const currentMonthRecords = analytics.currentMonthRecords;
  const previousMonthRecords = analytics.previousMonthRecords;
  const monthlySpend = sumAmounts(currentMonthRecords);
  const previousMonthlySpend = sumAmounts(previousMonthRecords);
  const daysElapsed = Math.max(1, new Date().getDate());
  const dailyAverage = monthlySpend / daysElapsed;
  const summaryByKind = summarizeByKind(currentMonthRecords);
  const fuelShare = monthlySpend > 0 ? (summaryByKind.fuel.amount / monthlySpend) * 100 : 0;
  const otherShare = Math.max(0, 100 - fuelShare);
  const compare = getMonthCompareValue(monthlySpend, previousMonthlySpend);
  const computedStyles = window.getComputedStyle(document.documentElement);
  const accentStroke = computedStyles.getPropertyValue("--app-accent-solid").trim() || "#cafd00";
  const secondaryStroke = computedStyles.getPropertyValue("--app-secondary").trim() || "#bf81ff";
  const baseStroke = computedStyles.getPropertyValue("--app-card-elevated").trim() || "#262626";

  setText("statsMonthlySpend", formatNumber(monthlySpend, 2));
  setText("statsDailyAverage", formatNumber(dailyAverage, 2));
  setText("statsMonthCompare", compare.text);
  setText("statsFuelShare", `${formatNumber(fuelShare, 0)}%`);

  const monthCompareElement = document.getElementById("statsMonthCompare");
  if (monthCompareElement) {
    monthCompareElement.classList.toggle("text-error", compare.diff > 0);
    monthCompareElement.classList.toggle("text-primary-fixed", compare.diff < 0);
  }

  CATEGORY_ORDER.forEach((kind) => {
    const summary = summaryByKind[kind];
    const suffix = kind.charAt(0).toUpperCase() + kind.slice(1);
    setText(`stats${suffix}Count`, getCategoryCountLabel(summary.count));
    setText(`stats${suffix}Amount`, formatNumber(summary.amount, 2));
  });

  const baseArc = document.getElementById("statsBaseArc");
  if (baseArc) {
    baseArc.setAttribute("stroke", baseStroke);
  }

  const fuelArc = document.getElementById("statsFuelArc");
  if (fuelArc) {
    fuelArc.setAttribute("stroke", accentStroke);
    fuelArc.setAttribute("stroke-dasharray", `${(DONUT_CIRCUMFERENCE * fuelShare) / 100} ${DONUT_CIRCUMFERENCE}`);
    fuelArc.setAttribute("stroke-dashoffset", "0");
  }

  const otherArc = document.getElementById("statsOtherArc");
  if (otherArc) {
    otherArc.setAttribute("stroke", secondaryStroke);
    otherArc.setAttribute("stroke-dasharray", `${(DONUT_CIRCUMFERENCE * otherShare) / 100} ${DONUT_CIRCUMFERENCE}`);
    otherArc.setAttribute("stroke-dashoffset", `${-(DONUT_CIRCUMFERENCE * fuelShare) / 100}`);
  }
}

function renderSettingsPage(snapshot) {
  const activeVehicle = getActiveVehicle(snapshot);
  const secondaryVehicle = getSecondaryVehicle(snapshot);

  if (activeVehicle) {
    setText("settingsCurrentCarName", activeVehicle.name);
    setText("settingsCurrentCarPlate", activeVehicle.plate || "未设置牌照");
  }

  if (secondaryVehicle) {
    setText("settingsBackupCarName", secondaryVehicle.name);
    setText("settingsBackupCarMileage", `${formatNumber(secondaryVehicle.mileageKm, 1)} KM`);
  } else {
    setText("settingsBackupCarName", "添加备用车");
    setText("settingsBackupCarMileage", "点击创建");
  }

  applyUnitToggleStyles(snapshot.settings.unit);
  applyThemeToggleStyles(snapshot.settings.theme);
  setText("themeModeHint", getThemeHint(snapshot.settings.theme));
  applyTheme(snapshot.settings.theme);

  const latestRecord = [...snapshot.records].sort(compareRecordsDesc)[0];
  setText(
    "settingsLastSync",
    latestRecord ? `最后同步：${formatDateHeading(latestRecord.date)} ${formatTime(latestRecord.updatedAt || latestRecord.createdAt)}` : "最后同步：暂无数据"
  );

  void renderCloudAuthState(snapshot);
}

function promptVehicleFields(initialVehicle = {}, options = {}) {
  const nextName = window.prompt(options.nameLabel || "输入车辆名称", initialVehicle.name || "");
  if (nextName === null) {
    return null;
  }

  const nextPlate = window.prompt(options.plateLabel || "输入车辆牌照", initialVehicle.plate || "");
  if (nextPlate === null) {
    return null;
  }

  const needsMileage = options.includeMileage !== false;
  let nextMileage = initialVehicle.mileageKm || 0;

  if (needsMileage) {
    const rawMileage = window.prompt(options.mileageLabel || "输入当前里程（KM）", String(initialVehicle.mileageKm || 0));
    if (rawMileage === null) {
      return null;
    }
    nextMileage = Math.max(0, asNumber(rawMileage));
  }

  return {
    name: nextName.trim() || initialVehicle.name || "未命名车辆",
    plate: nextPlate.trim() || initialVehicle.plate || "",
    mileageKm: nextMileage,
  };
}

async function initAddPage(snapshot) {
  const params = new URLSearchParams(window.location.search);
  const requestedKind = isNonFuelKind(params.get("kind")) ? params.get("kind") : "fuel";
  const editingId = params.get("id");
  const activeVehicle = getActiveVehicle(snapshot);
  const form = document.getElementById("recordForm");
  const pageKicker = document.getElementById("addPageKicker");
  const pageHeading = document.getElementById("addPageHeading");
  const pageTitle = document.getElementById("addPageTitle");
  const dateLabel = document.getElementById("recordDateLabel");
  const odometerLabel = document.getElementById("recordOdometerLabel");
  const genericAmountLabel = document.getElementById("recordGenericAmountLabel");
  const titleLabel = document.getElementById("recordTitleLabel");
  const noteLabel = document.getElementById("recordNoteLabel");
  const dateInput = document.getElementById("recordDate");
  const odometerInput = document.getElementById("recordOdometer");
  const totalCostInput = document.getElementById("recordTotalCost");
  const litersInput = document.getElementById("recordLiters");
  const fullTankInput = document.getElementById("recordFullTank");
  const genericAmountInput = document.getElementById("recordGenericAmount");
  const titleInput = document.getElementById("recordTitle");
  const noteInput = document.getElementById("recordNote");
  const fuelPrimaryFields = document.getElementById("fuelPrimaryFields");
  const genericPrimaryFields = document.getElementById("genericPrimaryFields");
  const fuelConfigSection = document.getElementById("fuelConfigSection");
  const genericConfigSection = document.getElementById("genericConfigSection");
  const editingRecord = snapshot.records.find((record) => record.id === editingId) || null;

  let selectedKind = editingRecord?.kind || requestedKind;
  let selectedFuelType = editingRecord?.kind === "fuel" ? getFuelPayload(editingRecord).fuelType : "95#";

  function syncPageCopy() {
    const isFuelMode = selectedKind === "fuel";
    const meta = isFuelMode ? null : getNonFuelFormMeta(selectedKind);

    if (pageKicker) {
      pageKicker.textContent = isFuelMode ? "ADD NEW ENTRY" : meta.kicker;
    }

    if (pageHeading) {
      pageHeading.textContent = isFuelMode
        ? editingRecord
          ? "编辑本次旅程"
          : "记录本次旅程"
        : editingRecord
          ? meta.headingEdit
          : meta.headingCreate;
    }

    if (pageTitle) {
      pageTitle.textContent = editingRecord ? "编辑记录" : "记录";
    }

    if (dateLabel) {
      dateLabel.textContent = isFuelMode ? "加油日期" : "记录日期";
    }

    if (odometerLabel) {
      odometerLabel.textContent = "当前里程 (KM)";
    }

    if (!isFuelMode) {
      if (genericAmountLabel) {
        genericAmountLabel.textContent = meta.amountLabel;
      }
      if (titleLabel) {
        titleLabel.textContent = meta.titleLabel;
      }
      if (noteLabel) {
        noteLabel.textContent = "补充说明";
      }
      if (titleInput) {
        titleInput.placeholder = meta.titlePlaceholder;
      }
      if (noteInput) {
        noteInput.placeholder = meta.notePlaceholder;
      }
    }
  }

  function syncModeVisibility() {
    const isFuelMode = selectedKind === "fuel";
    if (fuelPrimaryFields) {
      fuelPrimaryFields.hidden = !isFuelMode;
    }
    if (genericPrimaryFields) {
      genericPrimaryFields.hidden = isFuelMode;
    }
    if (fuelConfigSection) {
      fuelConfigSection.hidden = !isFuelMode;
    }
    if (genericConfigSection) {
      genericConfigSection.hidden = isFuelMode;
    }

    setFuelButtons(selectedFuelType);
    setRecordKindButtons(selectedKind);
    syncPageCopy();
  }

  function seedGenericTitle(previousKind = selectedKind) {
    if (!titleInput || !isNonFuelKind(selectedKind)) {
      return;
    }

    const currentValue = titleInput.value.trim();
    const previousMeta = getNonFuelFormMeta(previousKind);
    if (!currentValue || currentValue === previousMeta.defaultTitle || currentValue === getCategoryLabel(previousKind)) {
      titleInput.value = getNonFuelFormMeta(selectedKind).defaultTitle;
    }
  }

  function updateUnitPrice() {
    const totalCost = asNumber(totalCostInput?.value);
    const liters = asNumber(litersInput?.value);
    setText("recordUnitPriceDisplay", liters > 0 ? formatNumber(totalCost / liters, 2) : "0.00");
  }

  function buildFuelDraftRecord() {
    const totalCost = asNumber(totalCostInput?.value);
    const liters = asNumber(litersInput?.value);
    const createdAt = editingRecord?.createdAt || nowIso();

    return normalizeRecord({
      id: editingRecord?.id,
      vehicleId: editingRecord?.vehicleId || activeVehicle?.id || "",
      kind: "fuel",
      date: dateInput?.value || getToday(),
      amount: totalCost,
      odometerKm: asNumber(odometerInput?.value),
      title: `${selectedFuelType} 汽油`,
      note: editingRecord?.kind === "fuel" ? editingRecord.note || "" : "",
      createdAt,
      updatedAt: nowIso(),
      payload: {
        liters,
        fuelType: selectedFuelType,
        isFullTank: Boolean(fullTankInput?.checked),
        unitPrice: liters > 0 ? totalCost / liters : 0,
      },
    });
  }

  function buildGenericDraftRecord() {
    const createdAt = editingRecord?.createdAt || nowIso();
    return normalizeRecord({
      id: editingRecord?.id,
      vehicleId: editingRecord?.vehicleId || activeVehicle?.id || "",
      kind: selectedKind,
      date: dateInput?.value || getToday(),
      amount: asNumber(genericAmountInput?.value),
      odometerKm: asNumber(odometerInput?.value),
      title: titleInput?.value?.trim() || getNonFuelFormMeta(selectedKind).defaultTitle,
      note: noteInput?.value?.trim() || "",
      createdAt,
      updatedAt: nowIso(),
      payload: {},
    });
  }

  function validateFuelRecord(record, records) {
    if (!record.date || record.odometerKm <= 0 || record.amount <= 0 || getFuelPayload(record).liters <= 0) {
      return "请完整填写日期、里程、总花费和加油量";
    }

    return validateOdometerSequence(records, record);
  }

  function validateGenericRecord(record, records) {
    if (!record.date || record.odometerKm <= 0 || record.amount <= 0 || !record.title.trim()) {
      return "请完整填写日期、里程、金额和项目名称";
    }

    return validateOdometerSequence(records, record);
  }

  if (dateInput) {
    dateInput.value = editingRecord?.date || getToday();
  }

  if (odometerInput) {
    odometerInput.value = editingRecord?.odometerKm || "";
  }

  if (editingRecord?.kind === "fuel") {
    if (totalCostInput) {
      totalCostInput.value = editingRecord.amount || "";
    }
    if (litersInput) {
      litersInput.value = getFuelPayload(editingRecord).liters || "";
    }
    if (fullTankInput) {
      fullTankInput.checked = getFuelPayload(editingRecord).isFullTank;
    }
  } else if (editingRecord) {
    if (genericAmountInput) {
      genericAmountInput.value = editingRecord.amount || "";
    }
    if (titleInput) {
      titleInput.value = editingRecord.title || "";
    }
    if (noteInput) {
      noteInput.value = editingRecord.note || "";
    }
  } else if (isNonFuelKind(selectedKind)) {
    seedGenericTitle(selectedKind);
  }

  document.querySelector("[data-fuel-options]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fuel-type]");
    if (!button) {
      return;
    }
    selectedFuelType = button.dataset.fuelType || "95#";
    setFuelButtons(selectedFuelType);
  });

  document.querySelector("[data-kind-options]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-record-kind]");
    if (!button) {
      return;
    }

    const nextKind = button.dataset.recordKind;
    if (!isNonFuelKind(nextKind)) {
      return;
    }

    const previousKind = selectedKind;
    selectedKind = nextKind;
    seedGenericTitle(previousKind);
    syncModeVisibility();
  });

  [totalCostInput, litersInput].forEach((input) => {
    input?.addEventListener("input", updateUnitPrice);
    input?.addEventListener("change", updateUnitPrice);
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nextSnapshot = await loadSnapshot();
    const draftRecord = selectedKind === "fuel" ? buildFuelDraftRecord() : buildGenericDraftRecord();
    const error =
      selectedKind === "fuel"
        ? validateFuelRecord(draftRecord, nextSnapshot.records)
        : validateGenericRecord(draftRecord, nextSnapshot.records);

    if (error) {
      showToast(error, "warning");
      return;
    }

    nextSnapshot.records = nextSnapshot.records.filter((record) => record.id !== draftRecord.id).concat(draftRecord);
    const vehicle = nextSnapshot.vehicles.find((item) => item.id === draftRecord.vehicleId);
    if (vehicle) {
      vehicle.updatedAt = nowIso();
      vehicle.mileageKm = Math.max(vehicle.mileageKm, draftRecord.odometerKm);
    }

    await saveSnapshot(nextSnapshot);
    window.location.href = editingRecord ? "./logs.html?flash=updated" : "./logs.html?flash=saved";
  });

  syncModeVisibility();
  updateUnitPrice();
}

async function initSettingsPage(snapshot) {
  const unitGroup = document.querySelector("[data-unit-group]");
  const themeGroup = document.querySelector("[data-theme-group]");
  const currentCarCard = document.getElementById("currentCarCard");
  const backupCarCard = document.getElementById("backupCarCard");
  const addCarCard = document.getElementById("addCarCard");
  const exportDataCard = document.getElementById("exportDataCard");
  const backupRestoreCard = document.getElementById("backupRestoreCard");
  const backupImportInput = document.getElementById("backupImportInput");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const cloudEmailInput = document.getElementById("cloudEmail");
  const cloudPasswordInput = document.getElementById("cloudPassword");
  const cloudSignUpButton = document.getElementById("cloudSignUpButton");
  const cloudSignInButton = document.getElementById("cloudSignInButton");
  const cloudSyncButton = document.getElementById("cloudSyncButton");
  const cloudSignOutButton = document.getElementById("cloudSignOutButton");

  renderSettingsPage(snapshot);

  if (snapshot.vehicles.length > MAX_MANAGED_VEHICLES) {
    showToast(`当前存在 ${snapshot.vehicles.length} 辆车，本版设置页仅支持管理前 ${MAX_MANAGED_VEHICLES} 辆`, "warning");
  }

  function readCloudCredentials() {
    const email = String(cloudEmailInput?.value || "").trim().toLowerCase();
    const password = String(cloudPasswordInput?.value || "").trim();
    if (!email || !password) {
      showToast("请先填写邮箱和密码", "warning");
      return null;
    }
    return { email, password };
  }

  async function persistTheme(nextTheme) {
    const nextSnapshot = await loadSnapshot();
    nextSnapshot.settings = normalizeSettings({
      ...nextSnapshot.settings,
      theme: nextTheme,
      updatedAt: nowIso(),
    });
    await saveSnapshot(nextSnapshot);
    renderSettingsPage(await loadSnapshot());
    showToast(`主题已切换为${THEME_META[nextTheme].label}`);
  }

  unitGroup?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-unit]");
    if (!button) {
      return;
    }

    const nextSnapshot = await loadSnapshot();
    nextSnapshot.settings = normalizeSettings({
      ...nextSnapshot.settings,
      unit: button.dataset.unit === "imperial" ? "imperial" : "metric",
      updatedAt: nowIso(),
    });
    await saveSnapshot(nextSnapshot);
    renderSettingsPage(await loadSnapshot());
  });

  themeGroup?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-theme]");
    if (!button || !THEME_ORDER.includes(button.dataset.theme)) {
      return;
    }

    await persistTheme(button.dataset.theme);
  });

  currentCarCard?.addEventListener("click", async () => {
    const nextSnapshot = await loadSnapshot();
    const activeVehicle = getActiveVehicle(nextSnapshot);
    if (!activeVehicle) {
      return;
    }

    const fields = promptVehicleFields(activeVehicle, {
      includeMileage: false,
      nameLabel: "编辑当前车辆名称",
      plateLabel: "编辑当前车辆牌照",
    });
    if (!fields) {
      return;
    }

    nextSnapshot.vehicles = nextSnapshot.vehicles.map((vehicle) =>
      vehicle.id === activeVehicle.id
        ? normalizeVehicle({
            ...vehicle,
            ...fields,
            updatedAt: nowIso(),
          })
        : vehicle
    );

    await saveSnapshot(nextSnapshot);
    renderSettingsPage(await loadSnapshot());
    showToast("当前车辆信息已更新");
  });

  backupCarCard?.addEventListener("click", async () => {
    const nextSnapshot = await loadSnapshot();
    const secondaryVehicle = getSecondaryVehicle(nextSnapshot);
    if (!secondaryVehicle) {
      showToast("还没有备用车，先点击“添加新成员”");
      return;
    }

    const shouldSwitch = window.confirm(`将 ${secondaryVehicle.name} 设为当前驾驶？\n点击“取消”继续编辑这辆车的信息。`);
    if (shouldSwitch) {
      nextSnapshot.settings = normalizeSettings({
        ...nextSnapshot.settings,
        activeVehicleId: secondaryVehicle.id,
        updatedAt: nowIso(),
      });
      await saveSnapshot(nextSnapshot);
      renderSettingsPage(await loadSnapshot());
      showToast(FLASH_MESSAGES.vehicleSwitched);
      return;
    }

    const fields = promptVehicleFields(secondaryVehicle, {
      includeMileage: true,
      nameLabel: "编辑备用车辆名称",
      plateLabel: "编辑备用车辆牌照",
      mileageLabel: "编辑备用车辆当前里程（KM）",
    });
    if (!fields) {
      return;
    }

    nextSnapshot.vehicles = nextSnapshot.vehicles.map((vehicle) =>
      vehicle.id === secondaryVehicle.id
        ? normalizeVehicle({
            ...vehicle,
            ...fields,
            updatedAt: nowIso(),
          })
        : vehicle
    );

    await saveSnapshot(nextSnapshot);
    renderSettingsPage(await loadSnapshot());
    showToast("备用车辆信息已更新");
  });

  addCarCard?.addEventListener("click", async () => {
    const nextSnapshot = await loadSnapshot();
    if (nextSnapshot.vehicles.length >= MAX_MANAGED_VEHICLES) {
      showToast(`当前版本最多支持 ${MAX_MANAGED_VEHICLES} 辆车，请先编辑现有车辆`, "warning");
      return;
    }

    const fields = promptVehicleFields(
      {
        name: "",
        plate: "",
        mileageKm: 0,
      },
      {
        includeMileage: true,
        nameLabel: "输入新车辆名称",
        plateLabel: "输入新车辆牌照",
        mileageLabel: "输入新车辆当前里程（KM）",
      }
    );

    if (!fields) {
      return;
    }

    const createdAt = nowIso();
    const newVehicle = normalizeVehicle({
      ...fields,
      createdAt,
      updatedAt: createdAt,
    });

    nextSnapshot.vehicles = [newVehicle, ...nextSnapshot.vehicles];

    if (window.confirm(`将 ${newVehicle.name} 设为当前驾驶？`)) {
      nextSnapshot.settings = normalizeSettings({
        ...nextSnapshot.settings,
        activeVehicleId: newVehicle.id,
        updatedAt: nowIso(),
      });
    }

    await saveSnapshot(nextSnapshot);
    renderSettingsPage(await loadSnapshot());
    showToast("车辆已加入车库");
  });

  exportDataCard?.addEventListener("click", async () => {
    const nextSnapshot = await loadSnapshot();
    if (window.confirm("点击“确定”导出 CSV 报告，点击“取消”导出完整 JSON 数据。")) {
      downloadFile("jiageyouba-report.csv", toCsv(nextSnapshot), "text/csv;charset=utf-8");
      showToast("CSV 报告已导出");
      return;
    }

    downloadFile(
      "jiageyouba-backup.json",
      JSON.stringify(
        {
          exportedAt: nowIso(),
          settings: nextSnapshot.settings,
          vehicles: nextSnapshot.vehicles,
          stations: nextSnapshot.stations,
          records: nextSnapshot.records,
        },
        null,
        2
      ),
      "application/json;charset=utf-8"
    );
    showToast("JSON 备份已导出");
  });

  backupRestoreCard?.addEventListener("click", async () => {
    if (window.confirm("点击“确定”选择 JSON 备份导入，点击“取消”导出当前完整备份。")) {
      backupImportInput?.click();
      return;
    }

    const nextSnapshot = await loadSnapshot();
    downloadFile(
      "jiageyouba-backup.json",
      JSON.stringify(
        {
          exportedAt: nowIso(),
          settings: nextSnapshot.settings,
          vehicles: nextSnapshot.vehicles,
          stations: nextSnapshot.stations,
          records: nextSnapshot.records,
        },
        null,
        2
      ),
      "application/json;charset=utf-8"
    );
    showToast("完整备份已导出");
  });

  backupImportInput?.addEventListener("change", async () => {
    const file = backupImportInput.files?.[0];
    if (!file) {
      return;
    }

    try {
      const imported = normalizeImportedSnapshot(JSON.parse(await file.text()));
      await saveSnapshot(imported, [{ key: "lastImportedAt", value: nowIso() }]);
      window.location.href = "./settings.html?flash=imported";
    } catch (error) {
      showToast(error instanceof Error ? error.message : "导入失败，请检查备份文件", "warning");
    } finally {
      backupImportInput.value = "";
    }
  });

  darkModeToggle?.addEventListener("click", async () => {
    const nextSnapshot = await loadSnapshot();
    const nextTheme = cycleThemeMode(nextSnapshot.settings.theme);
    await persistTheme(nextTheme);
  });

  cloudSignUpButton?.addEventListener("click", async () => {
    const credentials = readCloudCredentials();
    if (!credentials) {
      return;
    }

    const client = await ensureSupabaseClient().catch(() => null);
    if (!client) {
      showToast("云同步暂不可用，当前保持本地模式", "warning");
      await renderCloudAuthState(await loadSnapshot());
      return;
    }

    const { data, error } = await client.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        emailRedirectTo: SUPABASE_REDIRECT_URL,
      },
    });

    if (error) {
      showToast(error.message, "warning");
      return;
    }

    if (cloudPasswordInput) {
      cloudPasswordInput.value = "";
    }

    if (data.session) {
      showToast("注册成功，正在同步数据");
      await syncCloudSnapshot({ reason: "manual-signup" });
      renderSettingsPage(await loadSnapshot());
      return;
    }

    showToast("注册成功，请前往邮箱确认后再返回应用登录");
    await renderCloudAuthState(await loadSnapshot());
  });

  cloudSignInButton?.addEventListener("click", async () => {
    const credentials = readCloudCredentials();
    if (!credentials) {
      return;
    }

    const client = await ensureSupabaseClient().catch(() => null);
    if (!client) {
      showToast("云同步暂不可用，当前保持本地模式", "warning");
      await renderCloudAuthState(await loadSnapshot());
      return;
    }

    const { error } = await client.auth.signInWithPassword(credentials);
    if (error) {
      showToast(error.message, "warning");
      return;
    }

    if (cloudPasswordInput) {
      cloudPasswordInput.value = "";
    }

    showToast("登录成功，正在同步数据");
    const nextSnapshot = (await syncCloudSnapshot({ reason: "manual-signin", silent: true })) || (await loadSnapshot());
    renderSettingsPage(nextSnapshot);
  });

  cloudSyncButton?.addEventListener("click", async () => {
    const nextSnapshot = (await syncCloudSnapshot({ reason: "manual-sync", silent: false })) || (await loadSnapshot());
    renderSettingsPage(nextSnapshot);
  });

  cloudSignOutButton?.addEventListener("click", async () => {
    const client = await ensureSupabaseClient().catch(() => null);
    if (!client) {
      showToast("云同步暂不可用，当前保持本地模式", "warning");
      await renderCloudAuthState(await loadSnapshot());
      return;
    }

    const { error } = await client.auth.signOut();
    if (error) {
      showToast(error.message, "warning");
      return;
    }

    cloudState.session = null;
    cloudState.user = null;
    if (cloudPasswordInput) {
      cloudPasswordInput.value = "";
    }
    await renderCloudAuthState(await loadSnapshot());
    showToast("已退出云同步账号");
  });

  document.querySelectorAll("[data-kind-target]").forEach((card) => {
    card.addEventListener("click", () => {
      const kind = card.getAttribute("data-kind-target");
      if (!isNonFuelKind(kind)) {
        return;
      }
      window.location.href = `./add.html?kind=${encodeURIComponent(kind)}`;
    });
  });
}

async function initPage() {
  const activePage = document.body.dataset.page || "";
  applyTheme(readCachedThemeMode());
  bindSystemThemeWatcher();
  registerServiceWorker();
  await bootstrapDatabase();
  if (activePage === "settings") {
    await ensureSupabaseClient().catch((error) => {
      console.error(error);
      setCloudError(error);
    });
  }
  bindThemeEntryPoints();
  showFlash();

  let snapshot = await loadSnapshot();
  if (activePage === "settings" && cloudState.user) {
    snapshot = (await syncCloudSnapshot({ reason: "startup-sync", silent: true })) || snapshot;
  }
  applyTheme(snapshot.settings.theme);

  switch (document.body.dataset.page) {
    case "dashboard":
      renderDashboardPage(snapshot);
      break;
    case "add":
      await initAddPage(snapshot);
      break;
    case "stats":
      renderStatsPage(snapshot);
      break;
    case "logs":
      renderHistoryList(snapshot);
      break;
    case "settings":
      await initSettingsPage(snapshot);
      break;
    default:
      break;
  }

  renderFooterQuote(document.body.dataset.page);
  await renderCloudAuthState(snapshot);
}

document.addEventListener("DOMContentLoaded", () => {
  void initPage().catch((error) => {
    console.error(error);
    showToast("应用初始化失败，请刷新重试", "warning");
  });
});
