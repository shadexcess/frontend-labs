/* 1. На головній сторінці нижче назви онлайн консультацій, на одному з нею фоні користувач має можливість прочитати текст (вітання з прийдешнім 
святом текстом, інфо про графік роботи, зміни у роботі), що самодрукується зеленим кольором з товщиною гліфу у 1,5 рази більше, ніж текст назви. */

const text = "Привіт! 👋🏻 Ми раді бачити тебе на LEVELUP! Поки ти тут, знання стають твоїми друзями!"
const typeTextElement = document.getElementById("welcome-text")
let index = 0

document.addEventListener("DOMContentLoaded", typeText)

function typeText()
{
  if (index < text.length)
  {
    typeTextElement.textContent += text[index]
    index++
    setTimeout(typeText, Math.random() * 100 + 50) // від 50 до 150
  }
}



/* 2. Користувач має можливість відвідати сторінку «Послуги», де під блоком із назвою он-лайн консультацій та її логотипом, по центру розташована 
карусель із зображень послуг. Висота елементів каруселі не більше 20% від висоти вікна перегляду для користувача. */

const slider = document.getElementById("slider")
if (slider) 
{
  // const cards = slider.querySelectorAll(".card")

  const buttonPrev = document.querySelector(".button-previous")
  const buttonNext = document.querySelector(".button-next")

  // function getScrollAmount() 
  // {
  //   const card = cards[0]
  //   const style = getComputedStyle(card)
  //   const cardWidth = card.offsetWidth
  //   const gap = parseInt(style.marginRight) || 20
  //   return cardWidth + gap
  // }

  function updateButtons()
  {
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth
    buttonPrev.style.display = slider.scrollLeft > 0 ? "block" : "none"
    buttonNext.style.display = slider.scrollLeft < maxScrollLeft - 5 ? "block" : "none"
  }

  updateButtons()

  buttonNext.addEventListener("click", () => 
  {
    slider.scrollLeft += slider.clientWidth * 0.25; // += getScrollAmount() 
    setTimeout(updateButtons, 100)
  })

  buttonPrev.addEventListener("click", () => 
  {
    slider.scrollLeft -= slider.clientWidth * 0.25; // -= getScrollAmount() 
    setTimeout(updateButtons, 100)
  })
}



/* 3. Користувач, який протягом 40 сек фокусується на будь-якому лоті сторінки «Послуги», бачить модальне вікно (поверх сторінки, з її блокуванням), 
яке задає питання на перевірку відповідності діагнозу\потреби користувача лоту, що переглядається (наприклад, послуга терапевт, 
може спитати, які і на що скарги, як часто біль, тощо), з полем вводу відповіді (питання формує здобувач з свого власного досвіду). */

const questions = {
  "Консультації з математики": "Математика — це не страшно. Страшно — коли ви не знаєте, як порахувати чайові. А яка тема в математиці викликає у вас труднощі?", // Хочеш навчитись рахувати швидше, ніж касир у супермаркеті?
  "Консультації з історії України": "Хочете, щоб історичні періоди складались у голові, як пазл? Який період або тема вам найменш зрозуміла?",
  "Консультації з англійської мови": "Хочете розуміти серіали без субтитрів і без паніки? Що саме хочете покращити — граматику, словниковий запас чи розуміння на слух?",
  "Онлайн-консультації з інших шкільних предметів": "Є предмет, який здається темною магією? Давайте розберемося разом! Який саме предмет і що саме викликає труднощі?",
  "Підготовка до ДПА (9 клас)": "Мрієте вступити туди, куди хочете, а не туди, куди доведеться? З яких предметів потрібна допомога для підготовки?",
  "Консультації з інформатики": "Цікаво, як зробити сайт, який не падає при першому кліку? Які теми з інформатики вас цікавлять або викликають питання?",
  "Репетитор для учнів 1–4 класів": "Ваша дитина запитує «А чому?» 100 разів на день? Ми готові відповісти! З якими предметами або навичками у дитини виникають труднощі?",
  "Мовні курси для дорослих": "Хочете вивчити мову, щоб не тільки замовити каву в Парижі, а й пожартувати з баристою? Яка саме мова цікавить і для яких ситуацій?"
};

const focusTime = 4000
let focusTimer

const articles = document.querySelectorAll(".services-description article")

const modal = document.getElementById("modal")
const modalQuestion = document.getElementById("modal-question");
const closeModal = document.getElementById("close-modal");

for (const article of articles)
{
    article.setAttribute("tabindex", "0")

    article.addEventListener("focus", () => focused(article));
    article.addEventListener("mouseover", () => focused(article));

    article.addEventListener("blur", blurred)
    article.addEventListener("mouseout", blurred)
}

function focused(article) 
{
    focusTimer = setTimeout(() => showModal(article), focusTime);
}

function blurred() 
{
    clearTimeout(focusTimer)
}

function showModal(article) 
{
    const title = article.querySelector("h3").textContent;
    const question = questions[title] || "Опишіть вашу потребу детальніше:";
    modalQuestion.textContent = question;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

if (closeModal)
{
  closeModal.addEventListener("click", () => 
  {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
  });
}



/* 4. На сторінці «Зворотній зв’язок» при наведені курсора миші користувачем на поле «Детально», воно змінює колір фону, з’являється рамка 
та тінь від неї, а праворуч нього з’являється текст - підказка (tooltip) «Вдячні за Ваш час! Конкретизуйте мету звернення, будь ласка». */

// const detailedField = document.getElementById("detailed")

function enterDetailed(detailedField)
{
  detailedField.style.background = "linear-gradient(210deg, #a8edea, #fed6e3)";
  detailedField.style.border = "1px solid rgb(100, 100, 100)";
  detailedField.style.boxShadow = "0 10px 12px rgba(0, 0, 0, 0.2)";

  const tooltip = document.getElementById("tooltip");
  tooltip.style.display = "block";
  tooltip.style.left = detailedField.offsetWidth + 10 + "px";
}

function leaveDetailed(detailedField)
{
  detailedField.style.background = "";
  detailedField.style.border = "";
  detailedField.style.boxShadow = "";

  const tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
}



// 5. Для користувача, що зайшов на головну сторінку в період з 6 год до 21, колір фону всіх елементів світліший на 30% за колір в інший час.
const startDayHour = 6
const endDayHour = 21

const timeNow = new Date()
const hoursNow = timeNow.getHours()

if (hoursNow <= startDayHour || hoursNow >= endDayHour)
{
    document.documentElement.style.filter = "brightness(0.7)";
}