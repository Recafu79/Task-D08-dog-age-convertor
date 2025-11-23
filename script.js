// DOM Elements
const yearSelect = document.getElementById("year");
const monthSelect = document.getElementById("month");
const daySelect = document.getElementById("day");

// 生成年份：1990 ~ 今年
const currentYear = new Date().getFullYear();
for (let y = currentYear; y >= 1990; y--) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
}

// 生成月份
for (let m = 1; m <= 12; m++) {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    monthSelect.appendChild(opt);
}

// 更新日期選單
function updateDays() {
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    const daysInMonth = new Date(year, month, 0).getDate();

    daySelect.innerHTML = "";
    for (let d = 1; d <= daysInMonth; d++) {
        const opt = document.createElement("option");
        opt.value = d;
        opt.textContent = d;
        daySelect.appendChild(opt);
    }
}

monthSelect.addEventListener("change", updateDays);
yearSelect.addEventListener("change", updateDays);
updateDays(); // 頁面載入時先產生一次日期


// ★ AKC 人狗年齡換算 ★
// 第一年 = 15 人類歲
// 第二年 = +9 人類歲（累計 24）
// 第三年以後，每年 +5 人類歲
function dogToHumanYears(dogAge) {
    if (dogAge <= 0) return 0;
    if (dogAge === 1) return 15;
    if (dogAge === 2) return 24;
    return 24 + (dogAge - 2) * 5;
}


// 計算結果
document.getElementById("calcBtn").addEventListener("click", function () {
    const y = parseInt(yearSelect.value);
    const m = parseInt(monthSelect.value);
    const d = parseInt(daySelect.value);

    const birthDate = new Date(y, m - 1, d);
    const today = new Date();

    if (birthDate > today) {
        document.getElementById("result").textContent = "❗ 出生日期不能在未來";
        return;
    }

    // 以天數換算狗狗實齡
    const diffMs = today - birthDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const dogAge = +(diffDays / 365.25).toFixed(2);

    // 換算為人類年齡（小數年齡按比例換算）
    const humanAge =
        dogToHumanYears(Math.floor(dogAge)) +
        (dogAge % 1) * 5;

    document.getElementById("result").innerHTML = `
        🐕 狗狗實際年齡：約 <b>${dogAge.toFixed(1)}</b> 歲<br>
        👨‍🦳 等同人類年齡：約 <b>${humanAge.toFixed(1)}</b> 歲
    `;
});
