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
const PRIMARY_RECORD_KINDS = ["fuel", "repair", "maintenance", "wash", "accessory"];
const NON_FUEL_KINDS = CATEGORY_ORDER.filter((kind) => kind !== "fuel");
const ODOMETER_REQUIRED_KINDS = ["fuel", "maintenance"];
const FUEL_TYPES = ["92#", "95#", "98#"];
const MILES_PER_KM = 0.621371;
const DONUT_CIRCUMFERENCE = 251.2;
const MIN_REASONABLE_FUEL_EFFICIENCY = 1;
const MAX_REASONABLE_FUEL_EFFICIENCY = 20;
const THEME_STORAGE_KEY = "jiageyouba:v35:theme";
const PAGE_VISIT_STORAGE_KEY = `${THEME_STORAGE_KEY}:page-visit`;
const THEME_ORDER = ["dark", "light", "system"];
const MAX_MANAGED_VEHICLES = 2;
const APP_VERSION = "3.6.7";
const DASHBOARD_FAST_RETURN_WINDOW_MS = 4500;
const SUPABASE_URL = "https://akjryomhmjdttxnevzxz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_9KnhgQT7Mzh5nMZMrCiSjg_pY0lEMgg";
const SUPABASE_REDIRECT_URL = "https://zhangwuji0630.github.io/jiageyouba-v34/settings.html";
const SUPABASE_SDK_URL = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
const SUPABASE_SDK_TIMEOUT_MS = 8000;
const CLOUD_TABLE = "user_snapshots";
const CLOUD_SYNC_DEBOUNCE_MS = 500;

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

const WASH_TYPE_META = Object.freeze({
  premium: {
    label: "精选洗车",
    shortLabel: "精选",
  },
  basic: {
    label: "普洗",
    shortLabel: "普洗",
  },
});

const VEHICLE_ART_LIBRARY = Object.freeze({
  coupe: {
    src: "./assets/vehicle-art/coupe-blue.svg",
    alt: "青蓝色动漫风跑车插画",
    mood: "AQUA GT",
  },
  offroad: {
    src: "./assets/vehicle-art/offroad-blue.svg",
    alt: "青蓝色动漫风越野车插画",
    mood: "COAST DEFENDER",
  },
  sedan: {
    src: "./assets/vehicle-art/sedan-blue.svg",
    alt: "青蓝色动漫风轿跑插画",
    mood: "AQUA DRIVE",
  },
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

const DASHBOARD_STORY_QUOTES = Object.freeze([
  "把路走长一点，把心放远一点。",
  "把今天开稳，明天就会更顺。",
  "先把方向扶正，再把路慢慢开远。",
  "每一段认真走过的路，都会留下答案。",
  "生活不必总是很快，但要一直向前。",
  "把节奏握在手里，路就不会乱。",
  "不是每次出发都很盛大，但都算数。",
  "今天也给自己留一点继续出发的底气。",
]);

const FLASH_MESSAGES = Object.freeze({
  saved: "记录已保存",
  updated: "记录已更新",
  imported: "备份已恢复",
  vehicleSwitched: "已切换当前驾驶车辆",
});

let databasePromise = null;
let supabaseSdkPromise = null;
let toastTimer = 0;
let systemThemeWatcherBound = false;
let cloudSyncTimer = 0;
const cloudState = {
  client: null,
  session: null,
  user: null,
  authBound: false,
  syncInFlight: false,
  syncQueued: false,
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
    useGrouping: false,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(asNumber(value));
}

function formatInteger(value) {
  return new Intl.NumberFormat("zh-CN", {
    useGrouping: false,
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
    markRuntimeCopyReady(element);
  }
}

function resolveNavigationUrl(url) {
  if (!url) {
    return null;
  }

  try {
    return new URL(url, window.location.href);
  } catch (error) {
    console.error("导航地址无效", error);
    return null;
  }
}

function navigateTo(url) {
  const nextUrl = resolveNavigationUrl(url);
  if (!nextUrl || nextUrl.href === window.location.href) {
    return;
  }
  window.location.href = nextUrl.href;
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

async function ensureSupabaseClient() {
  if (cloudState.client) {
    return cloudState.client;
  }

  await loadSupabaseSdk().catch((error) => {
    console.error(error);
    return false;
  });

  if (typeof window === "undefined" || typeof window.supabase?.createClient !== "function") {
    return null;
  }

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

  const { data, error } = await cloudState.client.auth.getSession();
  if (error) {
    throw error;
  }

  cloudState.session = data.session || null;
  cloudState.user = data.session?.user || null;
  return cloudState.client;
}

function withTimeout(promise, timeoutMs, timeoutMessage) {
  if (!timeoutMs || timeoutMs <= 0) {
    return promise;
  }

  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs);
    promise
      .then(resolve, reject)
      .finally(() => window.clearTimeout(timer));
  });
}

function loadSupabaseSdk(timeoutMs = SUPABASE_SDK_TIMEOUT_MS) {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.resolve(false);
  }

  if (typeof window.supabase?.createClient === "function") {
    return Promise.resolve(true);
  }

  if (!supabaseSdkPromise) {
    supabaseSdkPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[data-supabase-sdk="true"]');
      const script = existingScript || document.createElement("script");

      script.dataset.supabaseSdk = "true";
      script.async = true;
      script.src = SUPABASE_SDK_URL;
      script.onload = () => resolve(typeof window.supabase?.createClient === "function");
      script.onerror = () => reject(new Error("云同步组件加载失败"));

      if (!existingScript) {
        document.head.append(script);
      }
    });
  }

  return withTimeout(supabaseSdkPromise, timeoutMs, "云同步组件加载超时");
}

async function fetchRemoteSnapshotEnvelope(client) {
  const { data, error } = await client
    .from(CLOUD_TABLE)
    .select("snapshot, updated_at")
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

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
  const emailInput = document.getElementById("cloudEmail");
  const passwordInput = document.getElementById("cloudPassword");
  const signUpButton = document.getElementById("cloudSignUpButton");
  const signInButton = document.getElementById("cloudSignInButton");
  const syncButton = document.getElementById("cloudSyncButton");
  const signOutButton = document.getElementById("cloudSignOutButton");
  const signedOutPanel = document.getElementById("cloudSignedOutPanel");
  const signedInPanel = document.getElementById("cloudSignedInPanel");
  const signedInEmail = document.getElementById("cloudSignedInEmail");
  const emailField = emailInput?.closest(".app-field");
  const passwordField = passwordInput?.closest(".app-field");
  const nextSnapshot = snapshot || (await loadSnapshot());
  const userEmail = cloudState.user?.email || "";
  const isLightTheme = document.documentElement.classList.contains("light");
  const inputBackground = isLightTheme ? "#ffffff" : "#20201f";
  const inputColor = isLightTheme ? "#171a14" : "#ffffff";

  [signUpButton, signInButton, syncButton, signOutButton].forEach((button) => {
    if (!button) {
      return;
    }
    button.classList.remove("app-action-button");
    button.classList.add("app-secondary-button");
  });

  if (emailInput && userEmail) {
    emailInput.value = userEmail;
  }

  [emailInput, passwordInput].forEach((input) => {
    if (!input) {
      return;
    }
    input.style.backgroundColor = inputBackground;
    input.style.boxShadow = `0 0 0 1000px ${inputBackground} inset`;
    input.style.setProperty("-webkit-box-shadow", `0 0 0 1000px ${inputBackground} inset`);
    input.style.color = inputColor;
    input.style.caretColor = inputColor;
    input.style.setProperty("-webkit-text-fill-color", inputColor);
  });

  const isSignedIn = Boolean(cloudState.user);
  const lastSyncedAt = getMetaValue(nextSnapshot, CLOUD_META_KEYS.lastSyncedAt);

  statusElement.textContent = isSignedIn ? `当前账号：${userEmail}` : "未登录云同步";
  if (hintElement) {
    hintElement.textContent = isSignedIn ? "登录表单已收起，可直接同步当前账号数据或退出登录" : "登录后可在重装 PWA 后恢复车辆与记录";
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

  if (signedInEmail) {
    signedInEmail.textContent = userEmail || "--";
  }

  if (signedOutPanel && signedInPanel) {
    signedOutPanel.hidden = isSignedIn;
    signedInPanel.hidden = !isSignedIn;
  } else if (signedOutPanel) {
    signedOutPanel.hidden = isSignedIn;
  }

  if (emailField) {
    emailField.hidden = isSignedIn;
  }
  if (passwordField) {
    passwordField.hidden = isSignedIn;
  }
  if (signUpButton) {
    signUpButton.hidden = isSignedIn;
  }
  if (signInButton) {
    signInButton.hidden = isSignedIn;
  }
  if (syncButton) {
    syncButton.hidden = !isSignedIn;
  }
  if (signOutButton) {
    signOutButton.hidden = !isSignedIn;
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

    const { data, error } = await client
      .from(CLOUD_TABLE)
      .upsert(payload, { onConflict: "user_id" })
      .select("updated_at")
      .single();

    if (error) {
      throw error;
    }

    localSnapshot = applyCloudMeta(localSnapshot, userId, String(data?.updated_at || nowIso()));
    const savedSnapshot = await saveSnapshot(localSnapshot, [], { skipCloud: true });
    await renderCloudAuthState(savedSnapshot);

    if (!options.silent) {
      showToast("云同步已完成");
    }

    return savedSnapshot;
  } catch (error) {
    console.error(error);
    if (!options.silent) {
      const message = error instanceof Error ? error.message : String(error || "");
      showToast(
        message.includes(CLOUD_TABLE) || message.includes("relation") || message.includes("schema cache")
          ? "云同步表尚未初始化，请先执行 supabase/setup.sql"
          : "云同步失败，请稍后重试",
        "warning"
      );
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

function isReasonableFuelEfficiency(litersPer100Km) {
  return litersPer100Km >= MIN_REASONABLE_FUEL_EFFICIENCY && litersPer100Km <= MAX_REASONABLE_FUEL_EFFICIENCY;
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

    if (isReasonableFuelEfficiency(litersPer100Km)) {
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

function buildFuelIntervalMetrics(records) {
  const ordered = getFuelRecords(records)
    .filter((record) => record.odometerKm > 0 && record.amount > 0 && getFuelPayload(record).liters > 0)
    .sort(compareRecordsByOdometer);
  const metrics = new Map();

  for (let index = 0; index < ordered.length - 1; index += 1) {
    const record = ordered[index];
    const nextRecord = ordered[index + 1];
    const payload = getFuelPayload(record);
    const nextPayload = getFuelPayload(nextRecord);
    if (!payload.isFullTank || !nextPayload.isFullTank) {
      continue;
    }

    const distanceKm = nextRecord.odometerKm - record.odometerKm;
    if (distanceKm <= 0) {
      continue;
    }

    const litersPer100Km = (payload.liters * 100) / distanceKm;
    if (!isReasonableFuelEfficiency(litersPer100Km)) {
      continue;
    }

    const costPerKm = record.amount / distanceKm;

    metrics.set(record.id, {
      distanceKm,
      litersPer100Km,
      costPerKm,
    });
  }

  return metrics;
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
    fuelIntervalMetricsByRecordId: buildFuelIntervalMetrics(vehicleRecords),
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

function isEditableRecordKind(kind) {
  return CATEGORY_ORDER.includes(kind);
}

function isPrimaryRecordKind(kind) {
  return PRIMARY_RECORD_KINDS.includes(kind);
}

function isOdometerRequiredKind(kind) {
  return ODOMETER_REQUIRED_KINDS.includes(kind);
}

function getNonFuelFormMeta(kind) {
  return NON_FUEL_FORM_META[kind] || NON_FUEL_FORM_META.maintenance;
}

function normalizeWashType(value) {
  return value === "basic" ? "basic" : "premium";
}

function getWashTypeMeta(value) {
  return WASH_TYPE_META[normalizeWashType(value)] || WASH_TYPE_META.premium;
}

function getWashTypeFromRecord(record) {
  return normalizeWashType(record?.payload?.washType);
}

function getDefaultGenericTitle(kind, options = {}) {
  if (kind === "wash") {
    return getWashTypeMeta(options.washType).label;
  }
  return getNonFuelFormMeta(kind).defaultTitle;
}

function isDefaultGenericTitle(value) {
  const text = String(value || "").trim();
  if (!text) {
    return true;
  }

  return (
    Object.values(NON_FUEL_FORM_META).some((meta) => meta.defaultTitle === text) ||
    Object.values(WASH_TYPE_META).some((meta) => meta.label === text) ||
    Object.values(CATEGORY_META).some((meta) => meta.label === text)
  );
}

function getLatestFuelCostPerDistance(records, unitMode) {
  const intervalMetricsByRecordId = buildFuelIntervalMetrics(records);
  const orderedMetrics = getFuelRecords(records)
    .filter((record) => record.odometerKm > 0)
    .sort(compareRecordsByOdometer)
    .map((record) => intervalMetricsByRecordId.get(record.id))
    .filter(Boolean);
  const latestMetrics = orderedMetrics[orderedMetrics.length - 1];
  if (!latestMetrics) {
    return 0;
  }

  return unitMode === "imperial" ? latestMetrics.costPerKm / MILES_PER_KM : latestMetrics.costPerKm;
}

function getCostPerDistanceLabel(unitMode) {
  return unitMode === "imperial" ? "每英里花费" : "每公里花费";
}

function getCostPerDistanceUnit(unitMode) {
  return unitMode === "imperial" ? "CNY / MI" : "CNY / KM";
}

function getVehicleArtworkMeta(vehicleName = "") {
  const label = String(vehicleName || "");
  if (/911|GT3|保时捷|Cayman|Supra|跑车/i.test(label)) {
    return VEHICLE_ART_LIBRARY.coupe;
  }
  if (/路虎|卫士|Defender|SUV|越野|Jeep/i.test(label)) {
    return VEHICLE_ART_LIBRARY.offroad;
  }
  return VEHICLE_ART_LIBRARY.sedan;
}

function getHistoryFilterKind() {
  const kind = new URLSearchParams(window.location.search).get("kind");
  return isEditableRecordKind(kind) ? kind : "";
}

function buildLogsUrl(kind = "") {
  return kind && isEditableRecordKind(kind) ? `./logs.html?kind=${encodeURIComponent(kind)}` : "./logs.html";
}

function buildAddUrl(kind = "") {
  return kind && kind !== "fuel" && isEditableRecordKind(kind) ? `./add.html?kind=${encodeURIComponent(kind)}` : "./add.html";
}

function readCachedThemeMode() {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    return THEME_ORDER.includes(raw) ? raw : "dark";
  } catch {
    return "dark";
  }
}

function readLastPageVisit() {
  try {
    const raw = window.sessionStorage.getItem(PAGE_VISIT_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    const page = typeof parsed?.page === "string" ? parsed.page : "";
    const at = Number(parsed?.at);
    if (!page || !Number.isFinite(at)) {
      return null;
    }

    return { page, at };
  } catch {
    return null;
  }
}

function rememberCurrentPageVisit() {
  const page = document.body.dataset.page || "";
  if (!page) {
    return;
  }

  try {
    window.sessionStorage.setItem(
      PAGE_VISIT_STORAGE_KEY,
      JSON.stringify({
        page,
        at: Date.now(),
      })
    );
  } catch {
    // Ignore cache write failures.
  }
}

function shouldSkipDashboardEntranceMotion() {
  const navigationEntry = performance.getEntriesByType?.("navigation")?.[0];
  if (navigationEntry?.type === "back_forward") {
    return true;
  }

  const lastVisit = readLastPageVisit();
  if (!lastVisit || lastVisit.page === "dashboard") {
    return false;
  }

  return Date.now() - lastVisit.at <= DASHBOARD_FAST_RETURN_WINDOW_MS;
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

function markRuntimeCopyReady(element) {
  if (!element) {
    return;
  }

  if (element.hasAttribute("data-runtime-copy")) {
    element.dataset.runtimeCopy = "ready";
  }
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
  markRuntimeCopyReady(element);
  window.sessionStorage.setItem(sessionKey, nextQuote);
}

function renderDashboardStoryQuote() {
  const card = document.getElementById("dashboardStoryCard");
  const quoteElement = document.getElementById("dashboardStoryQuote");

  if (!card || !quoteElement || !DASHBOARD_STORY_QUOTES.length) {
    return;
  }

  const sessionKey = `${THEME_STORAGE_KEY}:quote:dashboard-story`;
  const applyQuote = (quote) => {
    quoteElement.classList.add("is-rotating");
    window.setTimeout(() => {
      quoteElement.textContent = quote;
      quoteElement.classList.remove("is-rotating");
      markRuntimeCopyReady(quoteElement);
    }, 120);
    window.sessionStorage.setItem(sessionKey, quote);
  };

  const pickNextQuote = () => {
    const previous = window.sessionStorage.getItem(sessionKey);
    let nextQuote = DASHBOARD_STORY_QUOTES[Math.floor(Math.random() * DASHBOARD_STORY_QUOTES.length)];

    if (DASHBOARD_STORY_QUOTES.length > 1 && nextQuote === previous) {
      nextQuote = DASHBOARD_STORY_QUOTES[(DASHBOARD_STORY_QUOTES.indexOf(nextQuote) + 1) % DASHBOARD_STORY_QUOTES.length];
    }

    return nextQuote;
  };

  applyQuote(pickNextQuote());

  if (card.dataset.quoteBound === "true") {
    return;
  }

  const rotateQuote = () => {
    applyQuote(pickNextQuote());
  };

  card.addEventListener("click", rotateQuote);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      rotateQuote();
    }
  });
  card.dataset.quoteBound = "true";
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches || false;
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function animateNumberText(id, targetValue, options = {}) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  const {
    digits = 0,
    duration = 520,
    prefix = "",
    suffix = "",
    formatter = null,
  } = options;

  if (!Number.isFinite(targetValue)) {
    element.textContent = formatter ? formatter(targetValue) : `${prefix}${formatNumber(targetValue, digits)}${suffix}`;
    return;
  }

  const finalValue = roundNumber(targetValue, digits);
  if (prefersReducedMotion() || duration <= 0) {
    element.textContent = formatter ? formatter(finalValue) : `${prefix}${formatNumber(finalValue, digits)}${suffix}`;
    element.dataset.motionValue = String(finalValue);
    return;
  }

  const startValue = Number(element.dataset.motionValue ?? 0);
  if (Math.abs(finalValue - startValue) < Math.pow(10, -digits) / 2) {
    element.textContent = formatter ? formatter(finalValue) : `${prefix}${formatNumber(finalValue, digits)}${suffix}`;
    element.dataset.motionValue = String(finalValue);
    return;
  }

  if (element._motionFrame) {
    window.cancelAnimationFrame(element._motionFrame);
  }

  element.textContent = formatter ? formatter(startValue) : `${prefix}${formatNumber(startValue, digits)}${suffix}`;

  const startedAt = performance.now();
  const paint = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const currentValue = startValue + (finalValue - startValue) * easeOutCubic(progress);
    const roundedValue = progress >= 1 ? finalValue : roundNumber(currentValue, digits);
    element.textContent = formatter ? formatter(roundedValue) : `${prefix}${formatNumber(roundedValue, digits)}${suffix}`;

    if (progress < 1) {
      element._motionFrame = window.requestAnimationFrame(paint);
      return;
    }

    element.dataset.motionValue = String(finalValue);
    element._motionFrame = 0;
  };

  element._motionFrame = window.requestAnimationFrame(paint);
}

function animatePercentageText(id, targetValue, options = {}) {
  animateNumberText(id, targetValue, {
    digits: options.digits ?? 0,
    duration: options.duration ?? 620,
    formatter: (value) => `${formatNumber(value, options.digits ?? 0)}%`,
  });
}

function playEntranceMotion(elements = [], options = {}) {
  const baseDelay = options.baseDelay ?? 0;
  const stepDelay = options.stepDelay ?? 72;
  const immediate = options.immediate ?? false;

  elements.forEach((element, index) => {
    if (!element) {
      return;
    }

    element.classList.add("app-motion-enter");
    if (prefersReducedMotion() || immediate) {
      element.classList.add("is-visible");
      return;
    }

    if (element._motionTimer) {
      window.clearTimeout(element._motionTimer);
    }
    element.classList.remove("is-visible");
    element._motionTimer = window.setTimeout(() => {
      element.classList.add("is-visible");
      element._motionTimer = 0;
    }, baseDelay + index * stepDelay);
  });
}

function playDashboardEntranceMotion(options = {}) {
  const hero = document.querySelector('.app-shell[data-page="dashboard"] .app-page-hero');
  const spendCard = document.getElementById("dashboardMonthlySpend")?.closest(".bg-surface-container");
  const miniCards = Array.from(document.querySelectorAll("#dashboardMiniCardsRow > .bg-surface-container"));
  const storyCard = document.getElementById("dashboardStoryCard");
  const immediate = options.immediate ?? false;
  playEntranceMotion([hero, spendCard], {
    immediate,
    baseDelay: 0,
    stepDelay: 18,
  });
  playEntranceMotion(miniCards, {
    immediate,
    baseDelay: 20,
    stepDelay: 16,
  });
  playEntranceMotion([storyCard], {
    immediate,
    baseDelay: 34,
    stepDelay: 0,
  });
}

function setDashboardHydrated(isHydrated) {
  if (document.body?.dataset.page === "dashboard") {
    document.body.dataset.dashboardHydrated = isHydrated ? "true" : "false";
  }
}

function setPageHydrated(isHydrated) {
  if (document.body?.hasAttribute("data-page-hydrated")) {
    document.body.dataset.pageHydrated = isHydrated ? "true" : "false";
  }
}

function animateStatsDonut(fuelShare, otherShare) {
  const fuelArc = document.getElementById("statsFuelArc");
  const otherArc = document.getElementById("statsOtherArc");
  if (!fuelArc || !otherArc) {
    return;
  }

  const fuelTarget = (DONUT_CIRCUMFERENCE * fuelShare) / 100;
  const otherTarget = (DONUT_CIRCUMFERENCE * otherShare) / 100;

  if (prefersReducedMotion()) {
    fuelArc.setAttribute("stroke-dasharray", `${fuelTarget} ${DONUT_CIRCUMFERENCE}`);
    fuelArc.setAttribute("stroke-dashoffset", "0");
    otherArc.setAttribute("stroke-dasharray", `${otherTarget} ${DONUT_CIRCUMFERENCE}`);
    otherArc.setAttribute("stroke-dashoffset", `${-fuelTarget}`);
    animatePercentageText("statsFuelShare", fuelShare, { duration: 0 });
    return;
  }

  if (fuelArc._motionFrame) {
    window.cancelAnimationFrame(fuelArc._motionFrame);
  }

  const duration = 620;
  const secondaryDelay = 0.12;
  fuelArc.setAttribute("stroke-dasharray", `0 ${DONUT_CIRCUMFERENCE}`);
  fuelArc.setAttribute("stroke-dashoffset", "0");
  otherArc.setAttribute("stroke-dasharray", `0 ${DONUT_CIRCUMFERENCE}`);
  otherArc.setAttribute("stroke-dashoffset", "0");

  const startedAt = performance.now();
  const paint = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const easedFuel = easeOutCubic(progress);
    const easedOther = easeOutCubic(Math.max(0, (progress - secondaryDelay) / (1 - secondaryDelay)));
    const fuelLength = fuelTarget * easedFuel;
    const otherLength = otherTarget * easedOther;

    fuelArc.setAttribute("stroke-dasharray", `${fuelLength} ${DONUT_CIRCUMFERENCE}`);
    fuelArc.setAttribute("stroke-dashoffset", "0");
    otherArc.setAttribute("stroke-dasharray", `${otherLength} ${DONUT_CIRCUMFERENCE}`);
    otherArc.setAttribute("stroke-dashoffset", `${-fuelLength}`);
    animatePercentageText("statsFuelShare", fuelShare * easedFuel, { duration: 0 });

    if (progress < 1) {
      fuelArc._motionFrame = window.requestAnimationFrame(paint);
      return;
    }

    animatePercentageText("statsFuelShare", fuelShare, { duration: 0 });
    fuelArc._motionFrame = 0;
  };

  fuelArc._motionFrame = window.requestAnimationFrame(paint);
}

function playStatsCategoryEntrance(rows = []) {
  rows.forEach((row, index) => {
    if (!row) {
      return;
    }

    row.classList.add("app-stats-category-row");
    if (prefersReducedMotion()) {
      row.classList.add("is-visible");
      return;
    }

    if (row._motionTimer) {
      window.clearTimeout(row._motionTimer);
    }
    row.classList.remove("is-visible");
    row._motionTimer = window.setTimeout(() => {
      row.classList.add("is-visible");
      row._motionTimer = 0;
    }, 120 + index * 56);
  });
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

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

function bindThemeEntryPoints() {
  ["dashboardThemeHint", "addThemeHint", "statsThemeHint", "logsThemeHint"].forEach((id) => {
    document.getElementById(id)?.addEventListener("click", () => {
      navigateTo("./settings.html#themePreferences");
    });
  });
}

function ensureDashboardMiniCardsLayout() {
  const spendCard = document.getElementById("dashboardMonthlySpend")?.closest(".bg-surface-container");
  const mileageCard = document.getElementById("dashboardMonthlyMileage")?.closest(".bg-surface-container");
  const efficiencyCard = document.getElementById("dashboardAvgEfficiency")?.closest(".bg-surface-container");

  if (!spendCard || !mileageCard || !efficiencyCard) {
    return;
  }

  let row = document.getElementById("dashboardMiniCardsRow");
  if (!row) {
    row = document.createElement("div");
    row.id = "dashboardMiniCardsRow";
    row.className = "col-span-2 grid grid-cols-3 gap-3";
    spendCard.insertAdjacentElement("afterend", row);
  }

  [mileageCard, efficiencyCard].forEach((card) => {
    card.className = "bg-surface-container rounded-lg p-4 min-h-[118px] flex flex-col justify-between app-motion-enter";
    card.classList.remove("aspect-square");
    row.appendChild(card);
  });

  let costCard = document.getElementById("dashboardCostPerDistanceCard");
  if (!costCard) {
    costCard = document.createElement("div");
    costCard.id = "dashboardCostPerDistanceCard";
    costCard.className = "bg-surface-container rounded-lg p-4 min-h-[118px] flex flex-col justify-between app-motion-enter";
    costCard.innerHTML = `
      <span class="material-symbols-outlined text-primary-fixed text-2xl" data-icon="payments">payments</span>
      <div>
        <span class="font-label text-on-surface-variant text-[10px] uppercase block mb-1" data-dashboard-hydration-gate id="dashboardCostPerDistanceLabel">每公里花费</span>
        <div class="font-headline text-2xl font-bold" data-dashboard-hydration-gate id="dashboardCostPerDistance">--</div>
        <span class="font-label text-on-surface-variant text-[10px]" data-dashboard-hydration-gate id="dashboardCostPerDistanceUnit">CNY / KM</span>
      </div>
    `;
  }

  row.appendChild(costCard);
}

function ensureLogsHeaderElements() {
  const hero = document.querySelector('.app-shell[data-page="logs"] .app-page-hero');
  if (!hero) {
    return {};
  }

  let kicker = document.getElementById("logsHeroKicker");
  if (!kicker) {
    kicker = hero.querySelector("p");
    if (kicker) {
      kicker.id = "logsHeroKicker";
    }
  }

  let hint = document.getElementById("logsHeroHint");
  if (!hint) {
    hint = document.createElement("p");
    hint.id = "logsHeroHint";
    hint.className = "text-on-surface-variant text-xs font-thin mt-3";
    const amountWrap = hero.querySelector(".flex.items-baseline.gap-2");
    amountWrap?.insertAdjacentElement("afterend", hint);
  }

  let action = document.getElementById("logsScopeAction");
  if (!action) {
    action = document.createElement("a");
    action.id = "logsScopeAction";
    action.className = "hidden inline-flex mt-3 text-secondary font-label text-[0.75rem] font-bold uppercase";
    action.href = "./logs.html";
    hero.appendChild(action);
  }

  return { kicker, hint, action };
}

function ensureCurrentCarArtwork() {
  const currentCarCard = document.getElementById("currentCarCard");
  if (!currentCarCard || document.getElementById("settingsCurrentCarArtwork")) {
    return;
  }

  currentCarCard.classList.add("app-quote-card", "border", "border-white/5");
  const media = document.createElement("div");
  media.className = "absolute inset-y-0 right-0 w-[46%]";
  media.innerHTML = `
    <div class="absolute inset-0 bg-gradient-to-r from-surface-container via-surface-container/20 to-transparent"></div>
    <img alt="当前车辆插画" class="app-current-car-card__image absolute inset-y-0 right-0 h-full w-full object-contain object-right-bottom opacity-90" id="settingsCurrentCarArtwork" src="./assets/vehicle-art/sedan-blue.svg"/>
  `;
  currentCarCard.prepend(media);
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

function setWashButtons(activeWashType) {
  document.querySelectorAll("[data-wash-type]").forEach((button) => {
    const isActive = button.dataset.washType === activeWashType;
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

function renderDashboardPage(snapshot, options = {}) {
  const activeVehicle = getActiveVehicle(snapshot);
  if (!activeVehicle) {
    setDashboardHydrated(true);
    return;
  }

  ensureDashboardMiniCardsLayout();

  const immediate = options.immediateMotion === true;
  const unitMode = snapshot.settings.unit;
  const analytics = getVehicleAnalytics(snapshot, activeVehicle.id);
  const monthlySpend = sumAmounts(analytics.currentMonthRecords);
  const previousMonthlySpend = sumAmounts(analytics.previousMonthRecords);
  const monthlyDistance = getDistanceCoverage(analytics.currentMonthRecords);
  const lifetimeAvgEfficiency = averageEfficiency(analytics.fuelSeries);
  const latestFuelCostPerDistance = getLatestFuelCostPerDistance(analytics.allRecords, unitMode);
  const displayedMileage = unitMode === "imperial" ? monthlyDistance * MILES_PER_KM : monthlyDistance;
  const displayedEfficiency = lifetimeAvgEfficiency > 0
    ? (unitMode === "imperial" ? 235.214583 / lifetimeAvgEfficiency : lifetimeAvgEfficiency)
    : 0;

  animateNumberText("dashboardMonthlySpend", monthlySpend, { digits: 2, duration: immediate ? 0 : 620 });
  setText("dashboardMonthlyDelta", getMonthDeltaLabel(monthlySpend, previousMonthlySpend));
  animateNumberText("dashboardMonthlyMileage", displayedMileage, { digits: 0, duration: immediate ? 0 : 560 });
  setText("dashboardMileageUnit", formatDistanceUnit(unitMode));
  if (lifetimeAvgEfficiency > 0) {
    animateNumberText("dashboardAvgEfficiency", displayedEfficiency, {
      digits: 1,
      duration: immediate ? 0 : 580,
      formatter: (value) =>
        unitMode === "imperial"
          ? `${formatNumber(value, 1)} MPG`
          : `${formatNumber(value, 1)} L/100`,
    });
  } else {
    setText("dashboardAvgEfficiency", formatCompactEfficiency(lifetimeAvgEfficiency, unitMode));
  }
  setText("dashboardCostPerDistanceLabel", getCostPerDistanceLabel(unitMode));
  if (latestFuelCostPerDistance > 0) {
    animateNumberText("dashboardCostPerDistance", latestFuelCostPerDistance, { digits: 2, duration: immediate ? 0 : 600 });
  } else {
    setText("dashboardCostPerDistance", "--");
  }
  setText("dashboardCostPerDistanceUnit", getCostPerDistanceUnit(unitMode));
  setText("dashboardCurrentCarName", activeVehicle.name);
  setDashboardHydrated(true);
  playDashboardEntranceMotion({
    immediate,
  });
}

function buildEmptyHistoryMarkup(kind = "") {
  const label = kind ? getCategoryLabel(kind) : "记录";
  const description = kind ? `还没有${label}记录，先去“记录”页补第一条。` : "先去“记录”页添加第一条数据，趋势和历史会自动生成。";
  return `
    <div class="group">
      <div class="bg-surface-container rounded-lg p-6">
        <p class="font-headline text-white font-bold text-lg">还没有${escapeHtml(label)}</p>
        <p class="font-body text-sm text-on-surface-variant mt-2">${escapeHtml(description)}</p>
        <a class="inline-block mt-5 px-4 py-2 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-sm" href="${escapeHtml(buildAddUrl(kind))}">去记录</a>
      </div>
    </div>
  `;
}

function getHistoryCardMetrics(record, analytics, unitMode) {
  if (record.kind === "fuel") {
    const intervalMetrics = analytics.fuelIntervalMetricsByRecordId.get(record.id);
    return {
      leftLabel: "油耗",
      leftValue: intervalMetrics ? formatDetailedEfficiency(intervalMetrics.litersPer100Km, unitMode) : "待下次满油",
      middleLabel: "行驶里程",
      middleValue: intervalMetrics ? `${formatDistanceValue(intervalMetrics.distanceKm, unitMode, 0)} ${unitMode === "imperial" ? "MI" : "KM"}` : "--",
      rightLabel: unitMode === "imperial" ? "每英里油费" : "每公里油费",
      rightValue: intervalMetrics
        ? `${formatNumber(unitMode === "imperial" ? intervalMetrics.costPerKm / MILES_PER_KM : intervalMetrics.costPerKm, 2)} ${unitMode === "imperial" ? "CNY/MI" : "CNY/KM"}`
        : "--",
    };
  }

  if (record.kind === "wash") {
    return {
      leftLabel: "记录类型",
      leftValue: getCategoryLabel(record.kind),
      middleLabel: "当前里程",
      middleValue: record.odometerKm > 0 ? `${formatDistanceValue(record.odometerKm, unitMode, 0)} ${unitMode === "imperial" ? "MI" : "KM"}` : "--",
      rightLabel: record.note ? "备注" : "洗车方式",
      rightValue: record.note || getWashTypeMeta(record.payload?.washType).shortLabel,
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
  if (!list) {
    setPageHydrated(true);
    return;
  }

  const activeVehicle = getActiveVehicle(snapshot);
  if (!activeVehicle) {
    setText("logsTotalSpend", formatNumber(0, 2));
    list.innerHTML = buildEmptyHistoryMarkup(getHistoryFilterKind());
    setPageHydrated(true);
    return;
  }

  const unitMode = snapshot.settings.unit;
  const analytics = getVehicleAnalytics(snapshot, activeVehicle.id);
  const vehicleMap = getVehicleMap(snapshot);
  const filterKind = getHistoryFilterKind();
  const scopedRecords = filterKind ? analytics.allRecords.filter((record) => record.kind === filterKind) : analytics.allRecords;
  const { kicker, hint, action } = ensureLogsHeaderElements();

  setText("logsTotalSpend", formatNumber(sumAmounts(scopedRecords), 2));

  if (kicker) {
    kicker.textContent = filterKind ? `${getCategoryLabel(filterKind)}历史` : "累计支出";
  }
  if (hint) {
    hint.textContent = filterKind ? `仅显示当前车辆的${getCategoryLabel(filterKind)}记录，轻触编辑，长按删除` : "轻触记录可编辑，长按可删除";
  }
  if (action) {
    action.hidden = !filterKind;
    action.href = buildLogsUrl();
    action.textContent = "查看全部";
  }

  if (!scopedRecords.length) {
    list.innerHTML = buildEmptyHistoryMarkup(filterKind);
    setPageHydrated(true);
    return;
  }

  list.innerHTML = scopedRecords
    .map((record) => {
      const vehicle = vehicleMap.get(record.vehicleId);
      const metrics = getHistoryCardMetrics(record, analytics, unitMode);
      return `
        <div class="group">
          <div class="flex justify-between items-end mb-4">
            <h2 class="font-headline text-on-surface font-medium text-[1.25rem]">${escapeHtml(formatDateHeading(record.date))}</h2>
            <span class="font-label text-on-surface-variant text-[0.75rem] font-bold tracking-wider">${escapeHtml(formatTime(record.updatedAt || record.createdAt))}</span>
          </div>
          <button class="app-card-button app-history-card bg-surface-container rounded-lg p-6 transition-all duration-300 active:scale-[0.98] active:bg-surface-container-high cursor-pointer" data-record-id="${escapeHtml(record.id)}" type="button">
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

  const recordMap = new Map(scopedRecords.map((record) => [record.id, record]));
  list.querySelectorAll("[data-record-id]").forEach((button) => {
    let holdTimer = 0;
    let holdTriggered = false;
    let pointerStartX = 0;
    let pointerStartY = 0;

    const clearHold = () => {
      if (holdTimer) {
        window.clearTimeout(holdTimer);
        holdTimer = 0;
      }
      button.classList.remove("app-history-card--holding");
    };

    button.addEventListener("pointerdown", (event) => {
      if (event.button !== undefined && event.button !== 0) {
        return;
      }

      holdTriggered = false;
      pointerStartX = event.clientX ?? 0;
      pointerStartY = event.clientY ?? 0;
      button.classList.add("app-history-card--holding");
      holdTimer = window.setTimeout(async () => {
        holdTimer = 0;
        holdTriggered = true;
        button.classList.remove("app-history-card--holding");

        const nextSnapshot = await loadSnapshot();
        const record = nextSnapshot.records.find((item) => item.id === (button.dataset.recordId || ""));
        if (!record) {
          return;
        }

        const shouldDelete = window.confirm(`确认删除 ${formatDateHeading(record.date)} 的${getCategoryLabel(record.kind)}记录？`);
        if (!shouldDelete) {
          return;
        }

        nextSnapshot.records = nextSnapshot.records.filter((item) => item.id !== record.id);
        await saveSnapshot(nextSnapshot);
        renderHistoryList(await loadSnapshot());
        showToast("记录已删除");
      }, 560);
    });

    button.addEventListener("pointermove", (event) => {
      if (!holdTimer) {
        return;
      }

      if (Math.abs((event.clientX ?? 0) - pointerStartX) > 8 || Math.abs((event.clientY ?? 0) - pointerStartY) > 8) {
        clearHold();
      }
    });

    ["pointerup", "pointerleave", "pointercancel"].forEach((type) => {
      button.addEventListener(type, clearHold);
    });

    button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    button.addEventListener("click", () => {
      if (holdTriggered) {
        holdTriggered = false;
        return;
      }

      const record = recordMap.get(button.dataset.recordId || "");
      if (!record) {
        return;
      }

      navigateTo(`./add.html?id=${encodeURIComponent(record.id)}`);
    });
  });

  setPageHydrated(true);
}

function renderStatsPage(snapshot) {
  const activeVehicle = getActiveVehicle(snapshot);
  if (!activeVehicle) {
    setPageHydrated(true);
    return;
  }

  const analytics = getVehicleAnalytics(snapshot, activeVehicle.id);
  const currentMonthRecords = analytics.currentMonthRecords;
  const previousMonthRecords = analytics.previousMonthRecords;
  const monthlySpend = sumAmounts(currentMonthRecords);
  const previousMonthlySpend = sumAmounts(previousMonthRecords);
  const daysElapsed = Math.max(1, new Date().getDate());
  const dailyAverage = monthlySpend / daysElapsed;
  const summaryByKind = summarizeByKind(analytics.allRecords);
  const currentMonthSummaryByKind = summarizeByKind(currentMonthRecords);
  const fuelShare = monthlySpend > 0 ? (currentMonthSummaryByKind.fuel.amount / monthlySpend) * 100 : 0;
  const otherShare = Math.max(0, 100 - fuelShare);
  const compare = getMonthCompareValue(monthlySpend, previousMonthlySpend);
  const computedStyles = window.getComputedStyle(document.documentElement);
  const accentStroke = computedStyles.getPropertyValue("--app-accent-solid").trim() || "#cafd00";
  const secondaryStroke = computedStyles.getPropertyValue("--app-secondary").trim() || "#bf81ff";
  const baseStroke = computedStyles.getPropertyValue("--app-card-elevated").trim() || "#262626";

  setText("statsMonthlySpend", formatNumber(monthlySpend, 2));
  setText("statsDailyAverage", formatNumber(dailyAverage, 2));
  setText("statsMonthCompare", compare.text);
  setText("statsFuelShare", "0%");

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

  document.getElementById("statsViewAllLink")?.setAttribute("href", buildLogsUrl());

  CATEGORY_ORDER.forEach((kind) => {
    const countElement = document.getElementById(`stats${kind.charAt(0).toUpperCase() + kind.slice(1)}Count`);
    const row = countElement?.closest(".flex.items-center.gap-5");
    if (!row) {
      return;
    }

    row.classList.add("cursor-pointer", "rounded-2xl", "px-2", "py-0.5", "-mx-2", "transition-all", "duration-200");
    row.tabIndex = 0;
    row.setAttribute("role", "link");
    row.setAttribute("aria-label", `查看${getCategoryLabel(kind)}历史`);
    row.onclick = () => {
      navigateTo(buildLogsUrl(kind));
    };
    row.onkeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigateTo(buildLogsUrl(kind));
      }
    };
  });

  const statsCategoryRows = CATEGORY_ORDER.map((kind) => {
    const countElement = document.getElementById(`stats${kind.charAt(0).toUpperCase() + kind.slice(1)}Count`);
    return countElement?.closest(".flex.items-center.gap-5") || null;
  }).filter(Boolean);
  setPageHydrated(true);
  playStatsCategoryEntrance(statsCategoryRows);

  const baseArc = document.getElementById("statsBaseArc");
  if (baseArc) {
    baseArc.setAttribute("stroke", baseStroke);
  }

  const fuelArc = document.getElementById("statsFuelArc");
  if (fuelArc) {
    fuelArc.setAttribute("stroke", accentStroke);
  }

  const otherArc = document.getElementById("statsOtherArc");
  if (otherArc) {
    otherArc.setAttribute("stroke", secondaryStroke);
  }

  animateStatsDonut(fuelShare, otherShare);
}

function renderSettingsPage(snapshot) {
  ensureCurrentCarArtwork();
  const activeVehicle = getActiveVehicle(snapshot);
  const secondaryVehicle = getSecondaryVehicle(snapshot);

  if (activeVehicle) {
    setText("settingsCurrentCarName", activeVehicle.name);
    setText("settingsCurrentCarPlate", activeVehicle.plate || "未设置牌照");
    const artworkElement = document.getElementById("settingsCurrentCarArtwork");
    const moodElement = document.getElementById("settingsCurrentCarMood");
    const artworkMeta = getVehicleArtworkMeta(activeVehicle.name);
    if (artworkElement) {
      artworkElement.src = artworkMeta.src;
      artworkElement.alt = artworkMeta.alt;
    }
    if (moodElement) {
      moodElement.textContent = artworkMeta.mood;
    }
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

  void renderCloudAuthState(snapshot)
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setPageHydrated(true);
    });
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
  const requestedKind = isPrimaryRecordKind(params.get("kind")) ? params.get("kind") : "fuel";
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
  const odometerWrap = document.getElementById("recordOdometerWrap");
  const fuelPrimaryFields = document.getElementById("fuelPrimaryFields");
  const genericPrimaryFields = document.getElementById("genericPrimaryFields");
  const fuelConfigSection = document.getElementById("fuelConfigSection");
  const genericConfigSection = document.getElementById("genericConfigSection");
  const washConfigSection = document.getElementById("washConfigSection");
  const washOptionLabel = washConfigSection?.querySelector("label");
  const editingRecord = snapshot.records.find((record) => record.id === editingId) || null;

  let selectedKind = editingRecord?.kind || requestedKind;
  let selectedFuelType = editingRecord?.kind === "fuel" ? getFuelPayload(editingRecord).fuelType : "95#";
  let selectedWashType = editingRecord?.kind === "wash" ? getWashTypeFromRecord(editingRecord) : "premium";

  if (washOptionLabel) {
    washOptionLabel.textContent = "洗车方式";
  }
  document.querySelector('[data-wash-type="premium"]')?.replaceChildren("精选");
  document.querySelector('[data-wash-type="basic"]')?.replaceChildren("普洗");

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
    const showOdometer = isOdometerRequiredKind(selectedKind);
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
    if (odometerWrap) {
      odometerWrap.hidden = !showOdometer;
    }
    if (!showOdometer && odometerInput && !editingRecord) {
      odometerInput.value = "";
    }
    if (washConfigSection) {
      washConfigSection.hidden = selectedKind !== "wash";
    }

    setFuelButtons(selectedFuelType);
    setRecordKindButtons(selectedKind);
    setWashButtons(selectedWashType);
    syncPageCopy();
  }

  function seedGenericTitle(force = false) {
    if (!titleInput || !isNonFuelKind(selectedKind)) {
      return;
    }

    const currentValue = titleInput.value.trim();
    if (force || !currentValue || isDefaultGenericTitle(currentValue)) {
      titleInput.value = getDefaultGenericTitle(selectedKind, {
        washType: selectedWashType,
      });
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
    const preservedOdometer = editingRecord?.kind === selectedKind ? asNumber(editingRecord?.odometerKm) : 0;
    return normalizeRecord({
      id: editingRecord?.id,
      vehicleId: editingRecord?.vehicleId || activeVehicle?.id || "",
      kind: selectedKind,
      date: dateInput?.value || getToday(),
      amount: asNumber(genericAmountInput?.value),
      odometerKm: isOdometerRequiredKind(selectedKind) ? asNumber(odometerInput?.value) : preservedOdometer,
      title:
        titleInput?.value?.trim() ||
        getDefaultGenericTitle(selectedKind, {
          washType: selectedWashType,
        }),
      note: noteInput?.value?.trim() || "",
      createdAt,
      updatedAt: nowIso(),
      payload:
        selectedKind === "wash"
          ? {
              ...(editingRecord?.kind === "wash" ? editingRecord.payload || {} : {}),
              washType: selectedWashType,
            }
          : editingRecord?.kind === selectedKind
            ? { ...(editingRecord.payload || {}) }
            : {},
    });
  }

  function validateFuelRecord(record, records) {
    if (!record.date || record.odometerKm <= 0 || record.amount <= 0 || getFuelPayload(record).liters <= 0) {
      return "请完整填写日期、里程、总花费和加油量";
    }

    return validateOdometerSequence(records, record);
  }

  function validateGenericRecord(record, records) {
    if (!record.date || record.amount <= 0 || !record.title.trim()) {
      return "请完整填写日期、金额和项目名称";
    }

    if (isOdometerRequiredKind(record.kind) && record.odometerKm <= 0) {
      return "请完整填写日期、里程、金额和项目名称";
    }

    if (!isOdometerRequiredKind(record.kind)) {
      return "";
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
    if (editingRecord.kind === "wash") {
      selectedWashType = getWashTypeFromRecord(editingRecord);
    }
  } else if (isNonFuelKind(selectedKind)) {
    seedGenericTitle(true);
  }

  document.querySelector("[data-fuel-options]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fuel-type]");
    if (!button) {
      return;
    }
    selectedFuelType = button.dataset.fuelType || "95#";
    setFuelButtons(selectedFuelType);
  });

  document.querySelector("[data-record-kind-tabs]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-record-kind]");
    if (!button) {
      return;
    }

    const nextKind = button.dataset.recordKind;
    if (!isPrimaryRecordKind(nextKind)) {
      return;
    }

    selectedKind = nextKind;
    seedGenericTitle(selectedKind !== "fuel");
    syncModeVisibility();
  });

  document.querySelector("[data-wash-options]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-wash-type]");
    if (!button) {
      return;
    }

    selectedWashType = normalizeWashType(button.dataset.washType);
    setWashButtons(selectedWashType);
    seedGenericTitle();
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
    navigateTo(editingRecord ? "./logs.html?flash=updated" : "./logs.html?flash=saved");
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
      navigateTo("./settings.html?flash=imported");
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

    const client = await ensureSupabaseClient();
    if (!client) {
      showToast("云同步组件加载失败，请刷新重试", "warning");
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

    const client = await ensureSupabaseClient();
    if (!client) {
      showToast("云同步组件加载失败，请刷新重试", "warning");
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
    const client = await ensureSupabaseClient();
    if (!client) {
      showToast("云同步组件加载失败，请刷新重试", "warning");
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
      navigateTo(`./add.html?kind=${encodeURIComponent(kind)}`);
    });
  });
}

async function renderCurrentPage(pageName, snapshot, options = {}) {
  switch (pageName) {
    case "dashboard":
      renderDashboardPage(snapshot, {
        immediateMotion: options.immediateMotion === true,
      });
      if (options.renderStatic !== false) {
        renderDashboardStoryQuote();
      }
      break;
    case "add":
      if (!options.refreshAfterSync) {
        await initAddPage(snapshot);
      }
      break;
    case "stats":
      renderStatsPage(snapshot);
      break;
    case "logs":
      renderHistoryList(snapshot);
      break;
    case "settings":
      if (options.refreshAfterSync) {
        renderSettingsPage(snapshot);
      } else {
        await initSettingsPage(snapshot);
      }
      break;
    default:
      break;
  }
}

function syncCloudInBackground(pageName) {
  void syncCloudSnapshot({ reason: "startup-sync", silent: true })
    .then(async (syncedSnapshot) => {
      if (!syncedSnapshot) {
        return;
      }
      applyTheme(syncedSnapshot.settings.theme);
      await renderCurrentPage(pageName, syncedSnapshot, {
        immediateMotion: true,
        refreshAfterSync: true,
        renderStatic: false,
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

async function initPage() {
  applyTheme(readCachedThemeMode());
  bindSystemThemeWatcher();
  registerServiceWorker();
  const pageName = document.body.dataset.page || "";
  const skipDashboardEntranceMotion = pageName === "dashboard" && shouldSkipDashboardEntranceMotion();
  await bootstrapDatabase();
  void ensureSupabaseClient()
    .then(() => {
      if (cloudState.user) {
        syncCloudInBackground(pageName);
        return;
      }
      void renderCloudAuthState().catch((error) => {
        console.error(error);
      });
    })
    .catch((error) => {
      console.error(error);
    });
  bindThemeEntryPoints();
  showFlash();

  const snapshot = await loadSnapshot();
  applyTheme(snapshot.settings.theme);
  await renderCurrentPage(pageName, snapshot, {
    immediateMotion: skipDashboardEntranceMotion,
  });

  renderFooterQuote(pageName);
  rememberCurrentPageVisit();
}

document.addEventListener("DOMContentLoaded", () => {
  void initPage().catch((error) => {
    console.error(error);
    showToast("应用初始化失败，请刷新重试", "warning");
  });
});
