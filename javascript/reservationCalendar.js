// Reservation Calendar Controller
class ReservationCalendar {
  constructor() {
    // Available dates and times (hardcoded as per requirements)
    this.availableDates = {
      '2025-12-15': ['10:00', '12:00', '14:00', '16:00'],
      '2025-12-18': ['09:00', '11:00', '15:00', '17:00'],
      '2025-12-20': ['10:00', '13:00', '16:00', '18:00'],
      '2025-12-22': ['09:00', '12:00', '14:00', '17:00'],
      '2026-01-05': ['10:00', '12:00', '14:00', '16:00'],
      '2026-01-08': ['09:00', '11:00', '15:00', '17:00'],
      '2026-01-12': ['10:00', '13:00', '16:00', '18:00'],
      '2026-01-15': ['09:00', '12:00', '14:00', '17:00']
    };

    this.currentDate = new Date();
    this.selectedDate = null;
    this.monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    this.initializeElements();
    this.attachEventListeners();
    this.renderCalendar();
  }

  initializeElements() {
    this.dateInput = document.getElementById('date');
    this.timeSelect = document.getElementById('time');
    this.calendarWidget = document.getElementById('calendar-widget');
    this.calendarDays = document.getElementById('calendar-days');
    this.currentMonthDisplay = document.getElementById('current-month');
    this.prevMonthBtn = document.getElementById('prev-month');
    this.nextMonthBtn = document.getElementById('next-month');
  }

  attachEventListeners() {
    if (this.dateInput) {
      this.dateInput.addEventListener('click', () => this.toggleCalendar());
    }

    if (this.prevMonthBtn) {
      this.prevMonthBtn.addEventListener('click', () => this.changeMonth(-1));
    }

    if (this.nextMonthBtn) {
      this.nextMonthBtn.addEventListener('click', () => this.changeMonth(1));
    }

    // Close calendar when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.calendarWidget.contains(e.target) && e.target !== this.dateInput) {
        this.hideCalendar();
      }
    });
  }

  toggleCalendar() {
    if (this.calendarWidget.classList.contains('hidden')) {
      this.showCalendar();
    } else {
      this.hideCalendar();
    }
  }

  showCalendar() {
    this.calendarWidget.classList.remove('hidden');
    this.renderCalendar();
  }

  hideCalendar() {
    this.calendarWidget.classList.add('hidden');
  }

  changeMonth(direction) {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.renderCalendar();
  }

  renderCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Update month display
    if (this.currentMonthDisplay) {
      this.currentMonthDisplay.textContent = `${this.monthNames[month]} ${year}`;
    }

    // Clear previous days
    if (this.calendarDays) {
      this.calendarDays.innerHTML = '';
    }

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day empty';
      this.calendarDays.appendChild(emptyDay);
    }

    // Add days of the month
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';
      dayElement.textContent = day;

      const dateStr = this.formatDate(year, month, day);
      const isAvailable = this.availableDates.hasOwnProperty(dateStr);
      const isPast = new Date(year, month, day) < today;

      if (isPast || !isAvailable) {
        dayElement.classList.add('disabled');
      } else {
        dayElement.classList.add('available');
        dayElement.addEventListener('click', () => this.selectDate(dateStr));
      }

      if (this.selectedDate === dateStr) {
        dayElement.classList.add('selected');
      }

      this.calendarDays.appendChild(dayElement);
    }
  }

  formatDate(year, month, day) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
  }

  selectDate(dateStr) {
    this.selectedDate = dateStr;

    // Format date for display (DD/MM/YYYY)
    const [year, month, day] = dateStr.split('-');
    const displayDate = `${day}/${month}/${year}`;

    this.dateInput.value = displayDate;
    this.hideCalendar();
    this.renderCalendar();
    this.updateTimeSlots(dateStr);
  }

  updateTimeSlots(dateStr) {
    const times = this.availableDates[dateStr] || [];

    // Clear current options
    this.timeSelect.innerHTML = '';

    if (times.length === 0) {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'No hay horas disponibles';
      this.timeSelect.appendChild(option);
      this.timeSelect.disabled = true;
    } else {
      // Add placeholder
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = 'Selecciona una hora';
      this.timeSelect.appendChild(placeholder);

      // Add available times
      times.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        this.timeSelect.appendChild(option);
      });

      this.timeSelect.disabled = false;
    }
  }
}

// Initialize calendar when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ReservationCalendar();
});
