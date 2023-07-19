import './App.css'
import {useState, useEffect} from 'react'

function App() {

  const [dayError, setDayError] = useState(false)
  const [monthError, setMonthError] = useState(false)
  const [yearError, setYearError] = useState(false)

  const [years, setYears] = useState<any>('')
  const [months, setMonths] = useState<any>('')
  const [days, setDays] = useState<any>('')
  const [resultYears, setResultYears] = useState<any>('')
  const [resultMonths, setResultMonths] = useState<any>('')
  const [resultDays, setResultDays] = useState<any>('')

  const handleChange = (e: any) => {
    const result = e.target.value.replace(/\D/g, '');
    switch(e.currentTarget.id){
      case 'day':
        if(result > 31){
          setDayError(true)
          setDays(result)
          break
        }
        setDays(result)
        setDayError(false)
        break
      case 'month':
        if(result > 12){
          setMonthError(true)
          setMonths(result)
          break
        }
        setMonths(result)
        setMonthError(false)
        break
      case 'year':
        if(result > (new Date).getFullYear()){
          setYearError(true)
          setYears(result)
          break
        }
        setYearError(false)
        setYears(result)
        break
    }
    
  }

  const calculateAge = () => {

    let date = new Date()
    let d = date.getDate()
    let m = 1 + date.getMonth()
    let y = date.getFullYear()
    let month = [31,28,31,30,31,30,31,31,30,31,30,31]

    if(!!days && days > d){
      d = d + month[m - 1]
      m = m - 1
    }

    if(!!months && months > m){
      m = m + 12
      y = y - 1
    }

    setResultDays(d - days)
    setResultMonths(m - months)
    setResultYears(y - years)
  }

  useEffect(() => {calculateAge()}, [years, months, days])


  return (
    <div className='App'>
      
    <div className='flex-container'>

    {yearError || monthError || dayError ? <div className="error"> <span>date is incorrect</span> </div> : null}

        <div className='input-container'>
          <div className='day-container'> <span>DAY</span><input type='string' id='day' placeholder='DD' maxLength={2} value={days} onChange={(e) => handleChange(e)}></input></div>
          <div className='month-container'> <span>MONTH</span><input type='string' id='month' placeholder='MM' maxLength={2} value={months} onChange={(e) => handleChange(e)}></input></div>
          <div className='year-container'> <span>YEAR</span><input type='string' id='year' placeholder='YYYY' maxLength={4} value={years} onChange={(e) => handleChange(e)}></input></div>
        </div>

        <div className='arrow-container'>
          <div className='line'></div>
          <div className='circle'><svg xmlns="http://www.w3.org/2000/svg" className='arrow' width="46" height="44" viewBox="0 0 46 44"><g fill="none" stroke="#FFF" stroke-width="2"><path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/></g></svg></div>
        </div>

        <div className='result-container'>
          <p><span>{years === '' ? '--' : yearError ? '--' : resultYears}</span>years</p>
          <p><span>{months === '' ? '--' : monthError ? '--' : resultMonths}</span>months</p>
          <p><span>{days === '' ? '--' : dayError ? '--' : resultDays}</span>days</p>
        </div>
        
    </div>

    </div>
  )
}

export default App
