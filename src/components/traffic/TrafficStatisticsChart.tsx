import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Car, Clock, TrendingUp } from 'lucide-react';

// Mock historical data - in real app this would come from API
const hourlyData = [
  { hour: '06:00', vehicles: 45 },
  { hour: '07:00', vehicles: 120 },
  { hour: '08:00', vehicles: 210 },
  { hour: '09:00', vehicles: 180 },
  { hour: '10:00', vehicles: 95 },
  { hour: '11:00', vehicles: 85 },
  { hour: '12:00', vehicles: 150 },
  { hour: '13:00', vehicles: 140 },
  { hour: '14:00', vehicles: 90 },
  { hour: '15:00', vehicles: 100 },
  { hour: '16:00', vehicles: 135 },
  { hour: '17:00', vehicles: 220 },
  { hour: '18:00', vehicles: 250 },
  { hour: '19:00', vehicles: 190 },
  { hour: '20:00', vehicles: 120 },
  { hour: '21:00', vehicles: 70 },
  { hour: '22:00', vehicles: 40 },
];

const weeklyData = [
  { day: 'จันทร์', avgVehicles: 1850, peakHour: '18:00' },
  { day: 'อังคาร', avgVehicles: 1920, peakHour: '17:30' },
  { day: 'พุธ', avgVehicles: 1780, peakHour: '18:00' },
  { day: 'พฤหัส', avgVehicles: 1950, peakHour: '17:00' },
  { day: 'ศุกร์', avgVehicles: 2200, peakHour: '18:30' },
  { day: 'เสาร์', avgVehicles: 1400, peakHour: '14:00' },
  { day: 'อาทิตย์', avgVehicles: 1100, peakHour: '16:00' },
];

const congestionData = [
  { hour: '06:00', level: 20 },
  { hour: '07:00', level: 55 },
  { hour: '08:00', level: 90 },
  { hour: '09:00', level: 75 },
  { hour: '10:00', level: 40 },
  { hour: '11:00', level: 35 },
  { hour: '12:00', level: 60 },
  { hour: '13:00', level: 55 },
  { hour: '14:00', level: 35 },
  { hour: '15:00', level: 45 },
  { hour: '16:00', level: 65 },
  { hour: '17:00', level: 95 },
  { hour: '18:00', level: 100 },
  { hour: '19:00', level: 80 },
  { hour: '20:00', level: 50 },
  { hour: '21:00', level: 30 },
];

const chartConfig = {
  vehicles: {
    label: "จำนวนรถ",
    color: "hsl(var(--primary))",
  },
  avgVehicles: {
    label: "รถเฉลี่ย/วัน",
    color: "hsl(var(--primary))",
  },
  level: {
    label: "ความหนาแน่น %",
    color: "hsl(var(--traffic-red))",
  },
};

interface TrafficStatisticsChartProps {
  intersectionName?: string;
}

export function TrafficStatisticsChart({ intersectionName }: TrafficStatisticsChartProps) {
  const peakHour = hourlyData.reduce((max, curr) => curr.vehicles > max.vehicles ? curr : max, hourlyData[0]);
  const totalToday = hourlyData.reduce((sum, curr) => sum + curr.vehicles, 0);
  const avgPerHour = Math.round(totalToday / hourlyData.length);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">สถิติการจราจรย้อนหลัง</h3>
        {intersectionName && (
          <span className="text-sm text-muted-foreground">{intersectionName}</span>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <Car className="w-4 h-4 mx-auto mb-1 text-primary" />
          <p className="text-xl font-bold">{totalToday.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">รถวันนี้</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <Clock className="w-4 h-4 mx-auto mb-1 text-traffic-red" />
          <p className="text-xl font-bold">{peakHour.hour}</p>
          <p className="text-xs text-muted-foreground">ชั่วโมงพีค</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <TrendingUp className="w-4 h-4 mx-auto mb-1 text-traffic-green" />
          <p className="text-xl font-bold">{avgPerHour}</p>
          <p className="text-xs text-muted-foreground">เฉลี่ย/ชม.</p>
        </div>
      </div>

      <Tabs defaultValue="hourly" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="hourly">รายชั่วโมง</TabsTrigger>
          <TabsTrigger value="weekly">รายสัปดาห์</TabsTrigger>
          <TabsTrigger value="congestion">ความหนาแน่น</TabsTrigger>
        </TabsList>

        <TabsContent value="hourly" className="mt-4">
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="hour" 
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="vehicles" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
          <p className="text-xs text-muted-foreground text-center mt-2">
            จำนวนรถต่อชั่วโมง (วันนี้)
          </p>
        </TabsContent>

        <TabsContent value="weekly" className="mt-4">
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="day" 
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="avgVehicles" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
          <p className="text-xs text-muted-foreground text-center mt-2">
            จำนวนรถเฉลี่ยต่อวัน (สัปดาห์นี้)
          </p>
        </TabsContent>

        <TabsContent value="congestion" className="mt-4">
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <AreaChart data={congestionData}>
              <defs>
                <linearGradient id="congestionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--traffic-red))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--traffic-red))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="hour" 
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={10}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone"
                dataKey="level" 
                stroke="hsl(var(--traffic-red))"
                fill="url(#congestionGradient)"
              />
            </AreaChart>
          </ChartContainer>
          <p className="text-xs text-muted-foreground text-center mt-2">
            ระดับความหนาแน่น % ตามเวลา
          </p>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
