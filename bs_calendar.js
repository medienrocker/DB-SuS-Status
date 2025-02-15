document.addEventListener("DOMContentLoaded", () => {
    const bs_calendarDates = document.querySelector(".bs_calendar-dates");
    const bs_monthYear = document.getElementById("bs_month-year");
    const bs_prevMonthBtn = document.getElementById("bs_prev-month");
    const bs_nextMonthBtn = document.getElementById("bs_next-month");
    const bs_tooltip = document.getElementById("bs_calendar-tooltip");

    let bs_currentDate = new Date();
    let bs_currentMonth = bs_currentDate.getMonth();
    let bs_currentYear = bs_currentDate.getFullYear();

    const bs_months = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];

    function parseMoodleDate(dateString) {
        const parts = dateString.split(" ");
        const day = parseInt(parts[0], 10);
        const month = bs_months.indexOf(parts[1]);
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }

    function getMoodleData() {
        return {
            start: parseMoodleDate(document.querySelector(".bs_start-date").textContent.trim()),
            end: parseMoodleDate(document.querySelector(".bs_end-date").textContent.trim()),
            place: document.querySelector(".bs_place").textContent.trim(),
            description: document.querySelector(".bs_place-description").textContent.trim()
        };
    }

    function showTooltip(event, text) {
        bs_tooltip.textContent = text;
        bs_tooltip.style.left = `${event.pageX + 10}px`;
        bs_tooltip.style.top = `${event.pageY + 10}px`;
        bs_tooltip.style.opacity = "1";
        bs_tooltip.style.display = "block";
    }

    function hideTooltip() {
        bs_tooltip.style.opacity = "0";
    }

    function bs_renderCalendar(month, year) {
        bs_calendarDates.innerHTML = "";
        bs_monthYear.textContent = `${bs_months[month]} ${year}`;
        const { start, end, place, description } = getMoodleData();
        const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            bs_calendarDates.appendChild(document.createElement("div"));
        }

        let isTooltipActive = false;

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.textContent = i;
            const currentDate = new Date(year, month, i);

            if (
                i === bs_currentDate.getDate() &&
                year === bs_currentDate.getFullYear() &&
                month === bs_currentDate.getMonth()
            ) {
                day.classList.add("bs_current-date");
            }

            if (start && end && currentDate >= start && currentDate <= end && currentDate.getDay() !== 6 && currentDate.getDay() !== 0) {
                day.classList.add("bs_selected-range");

                day.addEventListener("mouseover", (e) => {
                    if (!isTooltipActive) {
                        showTooltip(e, `${place}: ${description}`);
                        isTooltipActive = true;
                    }
                });

                day.addEventListener("mousemove", (e) => {
                    if (isTooltipActive) {
                        bs_tooltip.style.left = `${e.pageX + 10}px`;
                        bs_tooltip.style.top = `${e.pageY + 10}px`;
                    }
                });

                day.addEventListener("mouseout", () => {
                    isTooltipActive = false;
                    hideTooltip();
                });
            }

            if (currentDate.getDay() === 6 || currentDate.getDay() === 0) {
                day.classList.add("bs_weekend");
            }

            bs_calendarDates.appendChild(day);
        }
    }

    bs_renderCalendar(bs_currentMonth, bs_currentYear);

    bs_prevMonthBtn.addEventListener("click", () => {
        bs_currentMonth--;
        if (bs_currentMonth < 0) {
            bs_currentMonth = 11;
            bs_currentYear--;
        }
        bs_renderCalendar(bs_currentMonth, bs_currentYear);
    });

    bs_nextMonthBtn.addEventListener("click", () => {
        bs_currentMonth++;
        if (bs_currentMonth > 11) {
            bs_currentMonth = 0;
            bs_currentYear++;
        }
        bs_renderCalendar(bs_currentMonth, bs_currentYear);
    });
});
