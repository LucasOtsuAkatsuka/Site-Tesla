const targetDate = new Date("July 29, 2026 00:00:01").getTime();

let countdownInterval; 

function getTimeRemaining() {
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    if (timeDifference < 0) return null;

    return {
        days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
    };
}

function animateValue(id, endValue, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        obj.textContent = Math.floor(progress * endValue);
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

function startRealTimeCountdown() {
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const t = getTimeRemaining();

        if (!t) {
            clearInterval(countdownInterval);
            document.getElementById("timer").innerHTML = "A competição começou!";
            return;
        }

        document.getElementById("days").textContent = t.days;
        document.getElementById("hours").textContent = t.hours;
        document.getElementById("minutes").textContent = t.minutes;
        document.getElementById("seconds").textContent = t.seconds;

    }, 1000);
}

const observerTarget = document.querySelector('.timer-competicao');

const observerOptions = {
    root: null,
    threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const t = getTimeRemaining();
            
            if (t) {
                animateValue("days", t.days, 1000);
                animateValue("hours", t.hours, 1000);
                animateValue("minutes", t.minutes, 1000);
                animateValue("seconds", t.seconds, 1000);

                setTimeout(() => {
                    startRealTimeCountdown();
                }, 1000);
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (observerTarget) {
    observer.observe(observerTarget);
} else {
    startRealTimeCountdown();
}