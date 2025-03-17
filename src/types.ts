/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { KLineData, Styles, DeepPartial } from 'klinecharts'

export interface SymbolInfo {
  ticker: string
  name?: string
  shortName?: string
  exchange?: string
  market?: string
  pricePrecision?: number
  volumePrecision?: number
  priceCurrency?: string
  type?: string
  logo?: string
}

export interface Period {
  multiplier: number
  timespan: string
  text: string
}

export type DatafeedSubscribeCallback = (data: KLineData) => void

export interface Datafeed {
  searchSymbols (search?: string): Promise<SymbolInfo[]>
  getHistoryKLineData (symbol: SymbolInfo, period: Period, from: number, to: number): Promise<KLineData[]>
  subscribe (symbol: SymbolInfo, period: Period, callback: DatafeedSubscribeCallback): void
  unsubscribe (symbol: SymbolInfo, period: Period): void
}

export interface ChartProOptions {
  container: string | HTMLElement
  styles?: DeepPartial<Styles>
  watermark?: string | Node
  theme?: string
  locale?: string
  drawingBarVisible?: boolean
  symbol?: SymbolInfo  // Make optional again
  period?: Period      // Make optional again
  periods?: Period[]
  timezone?: string
  mainIndicators?: string[]
  subIndicators?: string[]
  datafeed: Datafeed
  // 添加指标变更回调
  onIndicatorChange?: (data: { 
    type: 'main' | 'sub',
    action: 'add' | 'remove',
    name: string,
    paneId?: string 
  }) => void
}

// 在 ChartPro 接口中添加 getWidget 方法
export interface ChartPro {
  setTheme: (theme: string) => void
  getTheme: () => string
  setStyles: (styles: any) => void
  getStyles: () => any
  setLocale: (locale: string) => void
  getLocale: () => string
  setTimezone: (timezone: string) => void
  getTimezone: () => string
  setSymbol: (symbol: SymbolInfo) => void
  getSymbol: () => SymbolInfo
  setPeriod: (period: Period) => void
  getPeriod: () => Period
  getWidget?: () => any  // 添加这一行
}
