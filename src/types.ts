export type ActiveTab =
  | 'landing'
  | 'digital_twin'
  | 'drone'
  | 'scanner'
  | 'nitrogen'
  | 'precision_spraying'
  | 'irrigation'
  | 'weather'
  | 'assistant'
  | 'yield_prediction'
  | 'marketplace'
  | 'wildlife'
  | 'analytics'
  | 'reports'
  | 'workflow'
  | 'settings'
  | 'dashboard'
  | 'farms'
  | 'live_camera'
  | 'iot'
  | 'decision'
  | 'pest'
  | 'map'
  | 'notifications'
  | 'profile'
  | 'scheduler'
  | 'tech_stack'
  | 'about';

export type Language = 'en' | 'ml' | 'hi' | 'ta' | 'te' | 'kn' | 'mr' | 'bn';

export interface TeamMember {
  name: string;
  role: string;
  college: string;
  avatar: string;
  skills: string[];
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  state: string;
  area: string; // e.g. "12.5 Acres"
  crop: string;
  soilType: string;
  healthScore: number; // 0 - 100
  aiScore: number;
  waterStatus: 'Optimal' | 'Deficient' | 'Saturated' | 'Scheduled';
  lastInspection: string;
  image: string;
  latitude: number;
  longitude: number;
  sensorsCount: number;
  dronesAssigned: number;
  yieldForecast: string;
}

export interface DroneTelemetry {
  id: string;
  name: string;
  model: string;
  battery: number;
  altitude: number; // meters
  speed: number; // m/s
  satellites: number;
  status: 'In Flight' | 'Hovering' | 'Charging' | 'Returning' | 'Idle';
  signalStrength: number; // %
  cameraStatus: 'Live 4K' | 'Thermal' | 'Multispectral' | 'Offline';
  lat: number;
  lng: number;
  missionProgress: number; // %
  currentTask: string;
}

export interface IoTSensor {
  id: string;
  name: string;
  zone: string;
  farmId: string;
  soilMoisture: number; // %
  temperature: number; // °C
  humidity: number; // %
  nitrogen: number; // mg/kg
  phosphorus: number; // mg/kg
  potassium: number; // mg/kg
  ph: number;
  battery: number; // %
  signal: number; // dBm
  status: 'Online' | 'Low Battery' | 'Calibrating';
  lastUpdated: string;
}

export interface AIAnalysisResult {
  id: string;
  diseaseName: string;
  scientificName: string;
  confidence: number; // %
  affectedAreaPct: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  recommendedTreatment: string;
  chemicalMedicine: string;
  organicAlternative: string;
  dosage: string;
  recoveryDays: number;
  sampleImage: string;
  heatmapOverlay: string;
  healthyComparisonImage: string;
}

export interface DecisionInsight {
  id: string;
  farmName: string;
  problem: string;
  rootCause: string;
  confidence: number;
  suggestedAction: string;
  expectedImprovement: string;
  waterSavedLiters: number;
  profitIncreasePct: number;
  alternativeOption: string;
  xaiReasoning: string[];
  priority: 'High' | 'Medium' | 'Low';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  read: boolean;
  category: 'Irrigation' | 'Drone' | 'Disease' | 'Weather' | 'System';
}

export interface WeatherData {
  temp: number;
  humidity: number;
  rainProb: number;
  windSpeed: number;
  windDir: string;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  bestIrrigationTime: string;
  bestDroneFlightWindow: string;
  harvestRecommendation: string;
  forecast: Array<{
    day: string;
    tempHigh: number;
    tempLow: number;
    condition: 'Sunny' | 'Rainy' | 'Cloudy' | 'Partly Cloudy';
    rainChance: number;
  }>;
}

export interface ScheduledMission {
  id: string;
  title: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  time: string;
  date: string;
  farmName: string;
  droneName: string;
  type: 'Multispectral Scan' | 'Targeted Spraying' | 'Crop Health Survey' | 'Thermal Check';
  status: 'Completed' | 'In Progress' | 'Scheduled' | 'Pending';
}
