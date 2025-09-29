'use client'

interface DaySchedule {
  day: string
  fajr: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  jumuah?: string
}

function computeAdhan(time: string): string | null {
  if (!/^[0-2]?\d:[0-5]\d$/.test(time)) return null
  const [h, m] = time.split(':').map(Number)
  const d = new Date(); d.setHours(h, m - 15, 0, 0)
  const hh = d.getHours().toString().padStart(2, '0')
  const mm = d.getMinutes().toString().padStart(2, '0')
  return `${hh}:${mm}`
}

export default function WeeklyTimetable({ base }: { base?: { fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string; jumuah?: string } }) {
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  const defaultTimes = {
    fajr: '05:30',
    dhuhr: '13:30',
    asr: '17:00',
    maghrib: 'Sunset + 15 min',
    isha: '20:30',
    jumuah: '13:30',
  }

  const times = base ? {
    fajr: base.fajr,
    dhuhr: base.dhuhr,
    asr: base.asr,
    maghrib: base.maghrib,
    isha: base.isha,
    jumuah: base.jumuah || defaultTimes.jumuah,
  } : defaultTimes

  const week: DaySchedule[] = days.map((d, idx) => ({
    day: d,
    fajr: times.fajr,
    dhuhr: times.dhuhr,
    asr: times.asr,
    maghrib: times.maghrib,
    isha: times.isha,
    jumuah: idx === 5 ? times.jumuah : undefined, // Friday index 5
  }))

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900">Weekly Congregational Timetable</h4>
        <p className="text-xs text-gray-500">Adhan is typically 15 minutes before salah. Maghrib salah begins after the adhan at sunset.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-2">Day</th>
              <th className="text-left px-4 py-2">Fajr</th>
              <th className="text-left px-4 py-2">Dhuhr</th>
              <th className="text-left px-4 py-2">Asr</th>
              <th className="text-left px-4 py-2">Maghrib</th>
              <th className="text-left px-4 py-2">Isha</th>
              <th className="text-left px-4 py-2">Jumuah</th>
            </tr>
          </thead>
          <tbody>
            {week.map((row, i) => (
              <tr key={row.day} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 font-medium text-gray-900">{row.day}</td>
                <td className="px-4 py-2"><div className="font-semibold">{row.fajr}</div><div className="text-[11px] text-gray-500">Adhan {computeAdhan(row.fajr) || '-'}</div></td>
                <td className="px-4 py-2"><div className="font-semibold">{row.dhuhr}</div><div className="text-[11px] text-gray-500">Adhan {computeAdhan(row.dhuhr) || '-'}</div></td>
                <td className="px-4 py-2"><div className="font-semibold">{row.asr}</div><div className="text-[11px] text-gray-500">Adhan {computeAdhan(row.asr) || '-'}</div></td>
                <td className="px-4 py-2"><div className="font-semibold">{row.maghrib}</div><div className="text-[11px] text-gray-500">Salah after adhan at sunset</div></td>
                <td className="px-4 py-2"><div className="font-semibold">{row.isha}</div><div className="text-[11px] text-gray-500">Adhan {computeAdhan(row.isha) || '-'}</div></td>
                <td className="px-4 py-2">{row.jumuah ? (<><div className="font-semibold">{row.jumuah}</div><div className="text-[11px] text-gray-500">Adhan {computeAdhan(row.jumuah) || '-'}</div></>) : <span className="text-gray-400">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

