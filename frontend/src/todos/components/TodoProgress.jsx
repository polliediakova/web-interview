import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
export function TodoProgress({ dueDate, completed }) {
  const days = getDaysDifference(dueDate)

  const style = {
    display: 'flex',
    padding: '8px',
    width: '160px',
    alignItems: 'center',
    justifyContent: 'center',
  }

  if (completed) {
    return (
      <div style={{ color: 'purple', ...style }}>
        <span>Yay!</span>
        <CelebrationIcon style={{ fill: 'purple' }} />
      </div>
    )
  }

  if (!dueDate) {
    return (
      <div style={{ color: 'grey', ...style }}>
        <span>Enter due date</span>
        <CalendarMonthIcon style={{ fill: 'grey' }} />
      </div>
    )
  }

  if (days > 0)
    return (
      <div style={{ color: 'green', ...style }}>
        <span>{days} day(s) left</span>
        <AccessTimeFilledIcon style={{ fill: 'green' }} />
      </div>
    )

  return (
    <div style={{ color: 'red', ...style }}>
      <span>{Math.abs(days)} day(s) overdue</span>
      <AccessAlarmsIcon style={{ fill: 'red' }} />
    </div>
  )
}

function getDaysDifference(date) {
  return Math.ceil((new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))
}
