export enum Role {
  USER = "USER",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
}

export enum MonitorType {
  SPINDLE_SPEED = "SPINDLE_SPEED",
  TEMPERATURE = "TEMPERATURE",
  VIBRATION = "VIBRATION",
  POWER_CONSUMPTION = "POWER",
  FEED_RATE = "FEED_RATE",
  COOLANT_LEVEL = "COOLANT_LEVEL",
  TOOL_WEAR = "TOOL_WEAR",
  AXIS_POSITION = "AXIS_POSITION",
}

export enum MachineType {
  MILL = "MILL",
  LATHE = "LATHE",
  ROUTER = "ROUTER",
  PLASMA = "PLASMA",
  EDM = "EDM",
  GRINDER = "GRINDER",
  LASER = "LASER",
  THREE_AXIS = "3_AXIS",
  FIVE_AXIS = "5_AXIS",
}

export enum MachineStatus {
  RUNNING = "RUNNING",
  IDLE = "IDLE",
  MAINTENANCE = "MAINTENANCE",
  BREAKDOWN = "BREAKDOWN",
  SETUP = "SETUP",
  WARMUP = "WARMUP",
  OFFLINE = "OFFLINE",
  ERROR = "ERROR",
  PAUSED = "PAUSED",
}

export enum MonitorStatus {
  ACTIVE = "ACTIVE",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  DISCONNECTED = "DISCONNECTED",
  CALIBRATING = "CALIBRATING",
  FAULT = "FAULT",
}

export enum AlertPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export enum ClientSubscriptionType {
  ALERTS = "alerts",
  MACHINE_STATUS = "machine_status",
  MONITOR_STATUS = "monitor_status",
  READING = "reading",
}

export enum WSMessageType {
  ALERTS = "ALERTS",
  COMMAND = "COMMAND",
  HEARTBEAT = "HEARTBEAT",
  MACHINE_STATUS = "MACHINE_STATUS",
  MONITOR_STATUS = "MONITOR_STATUS",
  READING = "READING",
}

// interface DropdownOption {
//   label: string;
//   value: string;
// }

// const formatEnumValue = (str: string): string => {
//   return str
//     .toLowerCase()
//     .split("_")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// };

// export const enumToOptions = (
//   enumObj: Record<string, string>
// ): DropdownOption[] => {
//   return Object.values(enumObj).map((value) => ({
//     label: formatEnumValue(value),
//     value: value,
//   }));
// };
