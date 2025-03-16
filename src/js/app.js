// Smart Shop Simulator - Main JavaScript

// Game state
const gameState = {
    balance: 1000,
    customers: 0,
    products: [],
    activeCampaigns: [],
    settings: {
        shopName: "Мой магазин",
        shopType: "grocery",
        difficulty: "medium",
        simulationSpeed: 3,
        autoSave: true
    },
    simulationRunning: false,
    dayCount: 1
};

// Инициализация Telegram WebApp
let tg = window.Telegram.WebApp;

// Данные курсов и тестов
const courses = {
    1: {
        id: 1,
        title: "Основы программирования",
        description: "Введение в мир программирования для начинающих",
        lessons: [
            { id: 1, title: "Введение в программирование", duration: "15 мин", completed: false, locked: false, content: {
                type: "text",
                text: `<h3>Введение в программирование</h3>
                <p>Программирование — это процесс создания компьютерных программ с помощью языков программирования.</p>
                <p>Основные концепции программирования:</p>
                <ul>
                    <li><strong>Переменные</strong> — контейнеры для хранения данных</li>
                    <li><strong>Условные операторы</strong> — позволяют выполнять разные действия в зависимости от условий</li>
                    <li><strong>Циклы</strong> — позволяют повторять блоки кода</li>
                    <li><strong>Функции</strong> — блоки кода, которые можно вызывать многократно</li>
                </ul>
                <div class="video-container">
                    <iframe width="100%" height="200" src="https://www.youtube.com/embed/zOjov-2OZ0E" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="interactive-element">
                    <h4>Попробуйте сами!</h4>
                    <p>Напишите простую программу, которая выводит "Hello, World!":</p>
                    <pre><code>console.log("Hello, World!");</code></pre>
                    <button class="tg-button" onclick="runCode()">Запустить код</button>
                    <div id="code-output" class="code-output"></div>
                </div>`
            }},
            { id: 2, title: "Переменные и типы данных", duration: "20 мин", completed: false, locked: true },
            { id: 3, title: "Условные операторы", duration: "25 мин", completed: false, locked: true },
            { id: 4, title: "Циклы", duration: "30 мин", completed: false, locked: true },
            { id: 5, title: "Функции", duration: "35 мин", completed: false, locked: true }
        ]
    },
    2: {
        id: 2,
        title: "Веб-разработка",
        description: "Изучите основы создания веб-сайтов с помощью HTML, CSS и JavaScript",
        lessons: [
            { id: 1, title: "Введение в HTML", duration: "20 мин", completed: false, locked: true },
            { id: 2, title: "Основы CSS", duration: "25 мин", completed: false, locked: true },
            { id: 3, title: "Верстка страницы", duration: "30 мин", completed: false, locked: true },
            { id: 4, title: "Введение в JavaScript", duration: "35 мин", completed: false, locked: true },
            { id: 5, title: "DOM-манипуляции", duration: "30 мин", completed: false, locked: true },
            { id: 6, title: "Обработка событий", duration: "25 мин", completed: false, locked: true },
            { id: 7, title: "Работа с формами", duration: "30 мин", completed: false, locked: true },
            { id: 8, title: "Финальный проект", duration: "45 мин", completed: false, locked: true }
        ]
    },
    3: {
        id: 3,
        title: "Мобильная разработка",
        description: "Создание приложений для iOS и Android",
        lessons: [
            { id: 1, title: "Введение в мобильную разработку", duration: "20 мин", completed: false, locked: true },
            { id: 2, title: "Основы UI/UX для мобильных приложений", duration: "25 мин", completed: false, locked: true },
            { id: 3, title: "Работа с API", duration: "30 мин", completed: false, locked: true },
            { id: 4, title: "Хранение данных", duration: "25 мин", completed: false, locked: true },
            { id: 5, title: "Публикация приложения", duration: "20 мин", completed: false, locked: true },
            { id: 6, title: "Финальный проект", duration: "45 мин", completed: false, locked: true }
        ]
    },
    4: {
        id: 4,
        title: "Мастер продаж",
        description: "Комплексный курс по развитию навыков продаж и маркетинговых стратегий",
        lessons: [
            { id: 1, title: "Основы успешных продаж", duration: "20 мин", completed: false, locked: false, content: {
                type: "text",
                text: `<h3>Основы успешных продаж</h3>
                <p>Продажи — это искусство и наука убеждения клиентов в ценности вашего продукта или услуги.</p>
                <p>Ключевые принципы успешных продаж:</p>
                <ul>
                    <li><strong>Понимание клиента</strong> — выявление потребностей и болей клиента</li>
                    <li><strong>Ценностное предложение</strong> — демонстрация ценности, а не просто характеристик</li>
                    <li><strong>Активное слушание</strong> — умение слышать клиента и задавать правильные вопросы</li>
                    <li><strong>Работа с возражениями</strong> — превращение возражений в возможности</li>
                </ul>
                <div class="video-container">
                    <iframe width="100%" height="200" src="https://www.youtube.com/embed/7OoVwAFtZ5o" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="interactive-element">
                    <h4>Практическое упражнение</h4>
                    <p>Представьте, что клиент говорит: "Ваш продукт слишком дорогой". Как бы вы ответили?</p>
                    <div class="role-play">
                        <button class="role-play-option" onclick="handleRolePlay('price', 1)">Мы предлагаем лучшее качество на рынке</button>
                        <button class="role-play-option" onclick="handleRolePlay('price', 2)">Могу предложить вам скидку</button>
                        <button class="role-play-option" onclick="handleRolePlay('price', 3)">Давайте обсудим, какую ценность вы ищете в продукте</button>
                    </div>
                    <div id="role-play-feedback" class="role-play-feedback"></div>
                </div>
                <div class="checklist">
                    <h4>Чек-лист для первой встречи с клиентом</h4>
                    <ul>
                        <li>Подготовить информацию о клиенте заранее</li>
                        <li>Определить ключевые вопросы для выявления потребностей</li>
                        <li>Подготовить презентацию ценности продукта</li>
                        <li>Продумать ответы на возможные возражения</li>
                        <li>Подготовить следующие шаги и план действий</li>
                    </ul>
                </div>`
            }},
            { id: 2, title: "Психология продаж", duration: "25 мин", completed: false, locked: true },
            { id: 3, title: "Эффективные маркетинговые стратегии", duration: "30 мин", completed: false, locked: true },
            { id: 4, title: "Клиентский сервис высшего уровня", duration: "25 мин", completed: false, locked: true },
            { id: 5, title: "Управление воронкой продаж", duration: "30 мин", completed: false, locked: true },
            { id: 6, title: "Техники закрытия сделок", duration: "20 мин", completed: false, locked: true },
            { id: 7, title: "Работа с ключевыми клиентами", duration: "25 мин", completed: false, locked: true },
            { id: 8, title: "Построение долгосрочных отношений", duration: "20 мин", completed: false, locked: true },
            { id: 9, title: "FAQ и советы экспертов", duration: "15 мин", completed: false, locked: true, content: {
                type: "text",
                text: `<h3>FAQ и советы экспертов</h3>
                <div class="faq-section">
                    <h4>Часто задаваемые вопросы</h4>
                    
                    <div class="faq-item">
                        <div class="faq-question">Как справиться с агрессивным клиентом?</div>
                        <div class="faq-answer">
                            <p>Сохраняйте спокойствие и не принимайте агрессию на свой счет. Активно слушайте, дайте клиенту высказаться. 
                            Выразите понимание его чувств и предложите конкретное решение проблемы. Если ситуация не улучшается, 
                            вежливо предложите продолжить разговор позже или привлеките руководителя.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">Как определить реальные потребности клиента?</div>
                        <div class="faq-answer">
                            <p>Используйте открытые вопросы (начинающиеся с "что", "как", "почему"). Практикуйте активное слушание, 
                            обращая внимание не только на слова, но и на интонацию и язык тела. Перефразируйте услышанное, чтобы 
                            убедиться в правильном понимании. Исследуйте не только текущие потребности, но и долгосрочные цели клиента.</p>
                        </div>
                    </div>
                    
                    <div class="faq-item">
                        <div class="faq-question">Как эффективно презентовать цену?</div>
                        <div class="faq-answer">
                            <p>Всегда сначала демонстрируйте ценность, а затем называйте цену. Используйте технику "сэндвича": 
                            ценность - цена - ценность. Говорите о цене уверенно, без извинений. При необходимости разбивайте 
                            стоимость на составляющие или на периоды (например, стоимость в месяц вместо годовой).</p>
                        </div>
                    </div>
                </div>
                
                <div class="expert-tips">
                    <h4>Советы от экспертов отрасли</h4>
                    
                    <div class="expert-tip">
                        <div class="expert-name">Михаил Иванов, директор по продажам компании "ТехноЛидер"</div>
                        <div class="expert-advice">
                            "Самая большая ошибка продавцов — говорить больше, чем слушать. Соотношение должно быть 80/20 
                            в пользу клиента. Задавайте правильные вопросы и внимательно слушайте ответы — там скрыты все 
                            ключи к успешной продаже."
                        </div>
                    </div>
                    
                    <div class="expert-tip">
                        <div class="expert-name">Елена Петрова, бизнес-тренер по продажам</div>
                        <div class="expert-advice">
                            "Регулярно анализируйте свои успешные и неуспешные сделки. Ведите дневник продаж, где отмечаете, 
                            что сработало, а что нет. Такая рефлексия — ключ к постоянному совершенствованию ваших навыков."
                        </div>
                    </div>
                </div>`
            }}
        ]
    },
    5: {
        id: 5,
        title: "Финансовая грамотность для всех",
        description: "Научитесь управлять личными финансами, инвестировать и планировать бюджет",
        lessons: [
            { id: 1, title: "Основы личных финансов", duration: "20 мин", completed: false, locked: false, content: {
                type: "text",
                text: `<h3>Основы личных финансов</h3>
                <p>Финансовая грамотность — это набор знаний и навыков, которые помогают принимать обоснованные решения по управлению личными финансами.</p>
                
                <div class="infographic">
                    <h4>Ключевые компоненты личных финансов</h4>
                    <div class="infographic-item">
                        <div class="infographic-icon">💰</div>
                        <div class="infographic-content">
                            <h5>Доходы</h5>
                            <p>Зарплата, подработки, пассивный доход, инвестиции</p>
                        </div>
                    </div>
                    <div class="infographic-item">
                        <div class="infographic-icon">📊</div>
                        <div class="infographic-content">
                            <h5>Расходы</h5>
                            <p>Необходимые (жильё, еда), желательные (развлечения), сбережения</p>
                        </div>
                    </div>
                    <div class="infographic-item">
                        <div class="infographic-icon">🏦</div>
                        <div class="infographic-content">
                            <h5>Сбережения</h5>
                            <p>Финансовая подушка безопасности, накопления на цели</p>
                        </div>
                    </div>
                    <div class="infographic-item">
                        <div class="infographic-icon">📈</div>
                        <div class="infographic-content">
                            <h5>Инвестиции</h5>
                            <p>Приумножение капитала, защита от инфляции</p>
                        </div>
                    </div>
                </div>
                
                <p>Первый шаг к финансовой грамотности — это понимание своего текущего финансового положения и создание бюджета.</p>
                
                <div class="video-container">
                    <iframe width="100%" height="200" src="https://www.youtube.com/embed/HQzoZfc3GwQ" frameborder="0" allowfullscreen></iframe>
                </div>
                
                <div class="interactive-element">
                    <h4>Практическое упражнение: Создание простого бюджета</h4>
                    <p>Попробуйте составить свой месячный бюджет, используя приведенный ниже калькулятор:</p>
                    
                    <div class="budget-calculator">
                        <div class="calculator-section">
                            <h5>Доходы</h5>
                            <div class="calculator-row">
                                <label for="income-salary">Зарплата:</label>
                                <input type="number" id="income-salary" placeholder="0" min="0">
                            </div>
                            <div class="calculator-row">
                                <label for="income-additional">Дополнительный доход:</label>
                                <input type="number" id="income-additional" placeholder="0" min="0">
                            </div>
                            <div class="calculator-row total">
                                <label>Всего доходов:</label>
                                <span id="total-income">0</span>
                            </div>
                        </div>
                        
                        <div class="calculator-section">
                            <h5>Расходы</h5>
                            <div class="calculator-row">
                                <label for="expense-housing">Жильё:</label>
                                <input type="number" id="expense-housing" placeholder="0" min="0">
                            </div>
                            <div class="calculator-row">
                                <label for="expense-food">Питание:</label>
                                <input type="number" id="expense-food" placeholder="0" min="0">
                            </div>
                            <div class="calculator-row">
                                <label for="expense-transport">Транспорт:</label>
                                <input type="number" id="expense-transport" placeholder="0" min="0">
                            </div>
                            <div class="calculator-row">
                                <label for="expense-entertainment">Развлечения:</label>
                                <input type="number" id="expense-entertainment" placeholder="0" min="0">
                            </div>
                            <div class="calculator-row">
                                <label for="expense-other">Прочее:</label>
                                <input type="number" id="expense-other" placeholder="0" min="0">
                            </div>
                            <div class="calculator-row total">
                                <label>Всего расходов:</label>
                                <span id="total-expenses">0</span>
                            </div>
                        </div>
                        
                        <div class="calculator-result">
                            <div class="calculator-row balance">
                                <label>Баланс:</label>
                                <span id="balance">0</span>
                            </div>
                        </div>
                        
                        <button class="tg-button" onclick="calculateBudget()">Рассчитать</button>
                    </div>
                    
                    <div id="budget-feedback" class="budget-feedback"></div>
                </div>
                
                <div class="key-takeaways">
                    <h4>Ключевые выводы</h4>
                    <ul>
                        <li>Ведение бюджета помогает контролировать расходы и увеличивать сбережения</li>
                        <li>Финансовая подушка безопасности должна покрывать 3-6 месяцев расходов</li>
                        <li>Правило 50/30/20: 50% на необходимые расходы, 30% на желания, 20% на сбережения</li>
                        <li>Регулярный анализ расходов помогает выявить возможности для экономии</li>
                    </ul>
                </div>`
            }},
            { id: 2, title: "Планирование бюджета", duration: "25 мин", completed: false, locked: false, content: {
                type: "text",
                text: `<h3>Планирование бюджета</h3>
                <p>Планирование бюджета — это процесс создания плана для ваших доходов и расходов. Это основа финансового благополучия, которая помогает достигать финансовых целей и избегать долгов.</p>
                
                <div class="infographic">
                    <h4>Этапы планирования бюджета</h4>
                    <div class="infographic-item">
                        <div class="infographic-icon">1️⃣</div>
                        <div class="infographic-content">
                            <h5>Определение доходов</h5>
                            <p>Учитывайте все источники дохода: зарплата, подработки, инвестиции, аренда и т.д.</p>
                        </div>
                    </div>
                    <div class="infographic-item">
                        <div class="infographic-icon">2️⃣</div>
                        <div class="infographic-content">
                            <h5>Отслеживание расходов</h5>
                            <p>Записывайте все расходы и категоризируйте их (необходимые, желательные, инвестиции)</p>
                        </div>
                    </div>
                    <div class="infographic-item">
                        <div class="infographic-icon">3️⃣</div>
                        <div class="infographic-content">
                            <h5>Установка целей</h5>
                            <p>Определите краткосрочные и долгосрочные финансовые цели</p>
                        </div>
                    </div>
                    <div class="infographic-item">
                        <div class="infographic-icon">4️⃣</div>
                        <div class="infographic-content">
                            <h5>Создание плана</h5>
                            <p>Распределите доходы по категориям расходов и сбережений</p>
                        </div>
                    </div>
                    <div class="infographic-item">
                        <div class="infographic-icon">5️⃣</div>
                        <div class="infographic-content">
                            <h5>Регулярный пересмотр</h5>
                            <p>Анализируйте и корректируйте бюджет ежемесячно</p>
                        </div>
                    </div>
                </div>
                
                <div class="video-container">
                    <iframe width="100%" height="200" src="https://www.youtube.com/embed/sVKQn2I4HDM" frameborder="0" allowfullscreen></iframe>
                </div>
                
                <h4>Методы планирования бюджета</h4>
                <p>Существует несколько популярных методов планирования бюджета:</p>
                
                <div class="budget-methods">
                    <div class="budget-method">
                        <h5>Метод 50/30/20</h5>
                        <p>Распределение дохода:</p>
                        <ul>
                            <li><strong>50%</strong> на необходимые расходы (жильё, еда, транспорт)</li>
                            <li><strong>30%</strong> на желания (развлечения, рестораны, хобби)</li>
                            <li><strong>20%</strong> на сбережения и инвестиции</li>
                        </ul>
                    </div>
                    
                    <div class="budget-method">
                        <h5>Система конвертов</h5>
                        <p>Распределение наличных денег по конвертам для разных категорий расходов. Когда конверт пуст, расходы в этой категории прекращаются до следующего месяца.</p>
                    </div>
                    
                    <div class="budget-method">
                        <h5>Метод "Заплати сначала себе"</h5>
                        <p>Сначала откладывайте определённый процент дохода на сбережения и инвестиции, а затем планируйте расходы из оставшейся суммы.</p>
                    </div>
                </div>
                
                <div class="interactive-element">
                    <h4>Интерактивный калькулятор инвестиций</h4>
                    <p>Рассчитайте, как ваши инвестиции могут вырасти со временем:</p>
                    
                    <div class="investment-calculator">
                        <div class="calculator-row">
                            <label for="initial-investment">Начальная сумма (₽):</label>
                            <input type="number" id="initial-investment" placeholder="10000" min="0">
                        </div>
                        <div class="calculator-row">
                            <label for="monthly-contribution">Ежемесячное пополнение (₽):</label>
                            <input type="number" id="monthly-contribution" placeholder="1000" min="0">
                        </div>
                        <div class="calculator-row">
                            <label for="annual-return">Годовая доходность (%):</label>
                            <input type="number" id="annual-return" placeholder="7" min="0" max="100">
                        </div>
                        <div class="calculator-row">
                            <label for="investment-period">Срок инвестирования (лет):</label>
                            <input type="number" id="investment-period" placeholder="10" min="1" max="50">
                        </div>
                        
                        <button class="tg-button" onclick="calculateInvestment()">Рассчитать</button>
                        
                        <div class="investment-result" id="investment-result" style="display: none;">
                            <h5>Результаты расчета:</h5>
                            <div class="result-row">
                                <span>Вложенная сумма:</span>
                                <span id="total-contributions">0 ₽</span>
                            </div>
                            <div class="result-row">
                                <span>Прибыль от инвестиций:</span>
                                <span id="total-interest">0 ₽</span>
                            </div>
                            <div class="result-row total">
                                <span>Итоговая сумма:</span>
                                <span id="final-amount">0 ₽</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="key-takeaways">
                    <h4>Ключевые выводы</h4>
                    <ul>
                        <li>Регулярное планирование бюджета помогает контролировать финансы и достигать целей</li>
                        <li>Выберите метод планирования, который подходит именно вам</li>
                        <li>Инвестирование даже небольших сумм может привести к значительному росту капитала</li>
                        <li>Автоматизируйте сбережения и инвестиции для формирования полезной привычки</li>
                    </ul>
                </div>`
            }},
            { id: 3, title: "Управление долгами и кредитами", duration: "30 мин", completed: false, locked: true },
            { id: 4, title: "Основы инвестирования", duration: "35 мин", completed: false, locked: true },
            { id: 5, title: "Фондовый рынок для начинающих", duration: "30 мин", completed: false, locked: true },
            { id: 6, title: "Пенсионное планирование", duration: "25 мин", completed: false, locked: true },
            { id: 7, title: "Страхование и управление рисками", duration: "20 мин", completed: false, locked: true },
            { id: 8, title: "Налоговая оптимизация", duration: "25 мин", completed: false, locked: true },
            { id: 9, title: "Финансовые цели и их достижение", duration: "20 мин", completed: false, locked: true }
        ]
    }
};

const tests = {
    1: {
        id: 1,
        title: "Тест по основам программирования",
        courseId: 1,
        lessonId: 1,
        questions: [
            {
                id: 1,
                text: "Что такое переменная?",
                options: [
                    "Контейнер для хранения данных",
                    "Функция для выполнения операций",
                    "Оператор сравнения",
                    "Метод вывода данных"
                ],
                correctAnswer: 0
            },
            {
                id: 2,
                text: "Какой оператор используется для сравнения значений без учета типа?",
                options: [
                    "===",
                    "==",
                    "=",
                    "!="
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                text: "Что выведет следующий код: console.log('Hello, World!')?",
                options: [
                    "Hello, World!",
                    "Ошибку",
                    "Ничего",
                    "undefined"
                ],
                correctAnswer: 0
            },
            {
                id: 4,
                text: "Какой язык программирования чаще всего используется для веб-разработки на стороне клиента?",
                options: [
                    "Java",
                    "Python",
                    "JavaScript",
                    "C++"
                ],
                correctAnswer: 2
            },
            {
                id: 5,
                text: "Что такое функция в программировании?",
                options: [
                    "Переменная для хранения данных",
                    "Блок кода, который можно вызывать многократно",
                    "Оператор сравнения",
                    "Тип данных"
                ],
                correctAnswer: 1
            }
        ]
    },
    2: {
        id: 2,
        title: "Тест по HTML и CSS",
        courseId: 2,
        lessonId: 1,
        questions: [
            {
                id: 1,
                text: "Какой тег используется для создания заголовка первого уровня?",
                options: [
                    "<header>",
                    "<h1>",
                    "<heading>",
                    "<title>"
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                text: "Какое свойство CSS используется для изменения цвета текста?",
                options: [
                    "text-color",
                    "font-color",
                    "color",
                    "text-style"
                ],
                correctAnswer: 2
            },
            // Другие вопросы...
        ]
    },
    3: {
        id: 3,
        title: "Тест по JavaScript",
        courseId: 2,
        lessonId: 4,
        questions: [
            {
                id: 1,
                text: "Какой метод используется для добавления элемента в конец массива?",
                options: [
                    "push()",
                    "append()",
                    "add()",
                    "insert()"
                ],
                correctAnswer: 0
            },
            {
                id: 2,
                text: "Как объявить переменную в JavaScript?",
                options: [
                    "var myVar;",
                    "variable myVar;",
                    "v myVar;",
                    "let myVar = 5;"
                ],
                correctAnswer: 3
            },
            // Другие вопросы...
        ]
    },
    4: {
        id: 4,
        title: "Тест по основам продаж",
        courseId: 4,
        lessonId: 1,
        questions: [
            {
                id: 1,
                text: "Что является ключевым в понимании потребностей клиента?",
                options: [
                    "Рассказать о всех характеристиках продукта",
                    "Активное слушание и задавание открытых вопросов",
                    "Предложение скидки",
                    "Демонстрация преимуществ перед конкурентами"
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                text: "Как лучше всего реагировать на возражение о высокой цене?",
                options: [
                    "Сразу предложить скидку",
                    "Сравнить с более дорогими конкурентами",
                    "Объяснить ценность продукта в контексте потребностей клиента",
                    "Сказать, что это рыночная цена"
                ],
                correctAnswer: 2
            },
            {
                id: 3,
                text: "Что такое ценностное предложение?",
                options: [
                    "Предложение скидки или акции",
                    "Демонстрация того, как продукт решает проблемы клиента",
                    "Перечисление всех характеристик продукта",
                    "Сравнение с конкурентами"
                ],
                correctAnswer: 1
            },
            {
                id: 4,
                text: "Какой подход наиболее эффективен при первой встрече с клиентом?",
                options: [
                    "Сразу предложить купить продукт",
                    "Рассказать о всех достоинствах компании",
                    "Задавать вопросы и выявлять потребности",
                    "Предложить специальную цену"
                ],
                correctAnswer: 2
            },
            {
                id: 5,
                text: "Что является признаком успешного завершения продажи?",
                options: [
                    "Клиент задает вопросы о деталях сотрудничества",
                    "Клиент говорит, что подумает",
                    "Клиент просит скидку",
                    "Клиент сравнивает с конкурентами"
                ],
                correctAnswer: 0
            }
        ]
    },
    5: {
        id: 5,
        title: "Тест по основам личных финансов",
        courseId: 5,
        lessonId: 1,
        questions: [
            {
                id: 1,
                text: "Что такое финансовая подушка безопасности?",
                options: [
                    "Инвестиции в ценные бумаги",
                    "Накопления для покрытия непредвиденных расходов",
                    "Страховой полис",
                    "Пенсионные накопления"
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                text: "Какое оптимальное соотношение расходов по правилу 50/30/20?",
                options: [
                    "50% на развлечения, 30% на необходимые расходы, 20% на сбережения",
                    "50% на необходимые расходы, 30% на желания, 20% на сбережения",
                    "50% на сбережения, 30% на необходимые расходы, 20% на желания",
                    "50% на необходимые расходы, 30% на сбережения, 20% на желания"
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                text: "Какой размер финансовой подушки безопасности рекомендуется экспертами?",
                options: [
                    "1 месяц расходов",
                    "3-6 месяцев расходов",
                    "12 месяцев расходов",
                    "2 года расходов"
                ],
                correctAnswer: 1
            },
            {
                id: 4,
                text: "Что из перечисленного НЕ относится к доходам?",
                options: [
                    "Зарплата",
                    "Дивиденды от акций",
                    "Выплаты по кредиту",
                    "Доход от сдачи недвижимости в аренду"
                ],
                correctAnswer: 2
            },
            {
                id: 5,
                text: "Какой первый шаг к финансовой грамотности?",
                options: [
                    "Открытие брокерского счета",
                    "Оформление кредитной карты",
                    "Понимание своего финансового положения и создание бюджета",
                    "Покупка страхового полиса"
                ],
                correctAnswer: 2
            }
        ]
    },
    6: {
        id: 6,
        title: "Тест по планированию бюджета",
        courseId: 5,
        lessonId: 2,
        questions: [
            {
                id: 1,
                text: "Какое распределение дохода предлагает метод 50/30/20?",
                options: [
                    "50% на желания, 30% на необходимые расходы, 20% на сбережения",
                    "50% на необходимые расходы, 30% на желания, 20% на сбережения",
                    "50% на сбережения, 30% на необходимые расходы, 20% на желания",
                    "50% на необходимые расходы, 30% на сбережения, 20% на желания"
                ],
                correctAnswer: 1
            },
            {
                id: 2,
                text: "В чем суть метода 'Заплати сначала себе'?",
                options: [
                    "Сначала оплатить все счета, потом планировать расходы",
                    "Сначала отложить деньги на сбережения, потом планировать расходы",
                    "Сначала потратить на развлечения, потом на необходимые расходы",
                    "Сначала инвестировать весь доход, потом жить на проценты"
                ],
                correctAnswer: 1
            },
            {
                id: 3,
                text: "Что такое система конвертов в планировании бюджета?",
                options: [
                    "Распределение наличных по конвертам для разных категорий расходов",
                    "Отправка денег в конвертах родственникам",
                    "Система электронных переводов между счетами",
                    "Метод учета расходов в таблице Excel"
                ],
                correctAnswer: 0
            },
            {
                id: 4,
                text: "Какой этап планирования бюджета следует за определением доходов?",
                options: [
                    "Установка финансовых целей",
                    "Создание плана расходов",
                    "Отслеживание расходов",
                    "Регулярный пересмотр бюджета"
                ],
                correctAnswer: 2
            },
            {
                id: 5,
                text: "Как часто рекомендуется пересматривать бюджет?",
                options: [
                    "Ежедневно",
                    "Еженедельно",
                    "Ежемесячно",
                    "Ежегодно"
                ],
                correctAnswer: 2
            }
        ]
    }
};

// Данные пользователя
let userData = {
    completedLessons: [],
    testResults: [],
    name: "Пользователь",
    points: 0,
    achievements: []
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Telegram WebApp
    if (tg && tg.initData) {
        // Если приложение запущено в Telegram, применяем тему Telegram
        if (tg.colorScheme === 'dark') {
            document.body.classList.add('tg-dark-theme');
        }
        
        // Настраиваем кнопку назад
        tg.BackButton.onClick(function() {
            // Обрабатываем нажатие кнопки назад
            handleBackButton();
        });
    }
    
    // Инициализация навигации
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Обновляем активную кнопку
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем соответствующую секцию
            showSection(sectionId);
            
            // Скрываем кнопку назад в Telegram
            if (tg && tg.BackButton) {
                tg.BackButton.hide();
            }
        });
    });
    
    // Инициализация кнопок курсов
    const courseButtons = document.querySelectorAll('[data-course-id]');
    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            openCourse(courseId);
        });
    });
    
    // Инициализация кнопок тестов
    const testButtons = document.querySelectorAll('[data-test-id]');
    testButtons.forEach(button => {
        button.addEventListener('click', function() {
            const testId = this.getAttribute('data-test-id');
            startTest(testId);
        });
    });
    
    // Обработчик кнопки редактирования профиля
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            // Заполняем форму текущими данными
            const profileNameInput = document.getElementById('profile-name');
            if (profileNameInput) {
                profileNameInput.value = userData.name || '';
            }
            
            // Показываем модальное окно
            const editProfileModal = new bootstrap.Modal(document.getElementById('editProfileModal'));
            editProfileModal.show();
        });
    }
    
    // Обработчик кнопки сохранения профиля
    const saveProfileBtn = document.getElementById('save-profile-btn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            // Получаем новое имя пользователя
            const profileNameInput = document.getElementById('profile-name');
            if (profileNameInput) {
                userData.name = profileNameInput.value.trim() || 'Пользователь';
            }
            
            // Сохраняем данные пользователя
            saveUserData();
            
            // Обновляем профиль
            updateUserProfile();
            
            // Закрываем модальное окно
            const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
            if (editProfileModal) {
                editProfileModal.hide();
            }
            
            // Показываем уведомление
            showNotification('Профиль успешно обновлен!', 'success');
        });
    }
    
    // Загрузка данных пользователя (если есть)
    loadUserData();
    
    // Если это первый запуск (нет сохраненных данных), показываем приветственное сообщение
    if (userData.completedLessons.length === 0 && userData.testResults.length === 0) {
        // Показываем модальное окно для ввода имени
        setTimeout(() => {
            const editProfileModal = new bootstrap.Modal(document.getElementById('editProfileModal'));
            editProfileModal.show();
        }, 1000);
    }
});

// Game Functions

// Update stats display
function updateStats() {
    document.getElementById('balance').textContent = gameState.balance;
    document.getElementById('customers').textContent = gameState.customers;
    document.getElementById('products').textContent = gameState.products.length;
}

// Update inventory display
function updateInventory() {
    const inventoryList = document.getElementById('inventory-list');
    
    if (gameState.products.length === 0) {
        inventoryList.innerHTML = '<p class="empty-state">У вас пока нет товаров. Добавьте их справа.</p>';
        return;
    }
    
    let html = '';
    gameState.products.forEach(product => {
        html += `
            <div class="product-item" data-id="${product.id}">
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <div class="product-details">
                        <span>Цена: ${product.price}₽</span>
                        <span>Закупочная: ${product.cost}₽</span>
                        <span>В наличии: ${product.quantity}</span>
                        <span>Продано: ${product.sold}</span>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="secondary-btn restock-btn" data-id="${product.id}">Пополнить</button>
                    <button class="secondary-btn remove-btn" data-id="${product.id}">Удалить</button>
                </div>
            </div>
        `;
    });
    
    inventoryList.innerHTML = html;
    
    // Add event listeners to new buttons
    document.querySelectorAll('.restock-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            restockProduct(productId);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeProduct(productId);
        });
    });
}

// Update campaigns display
function updateCampaigns() {
    const campaignsList = document.getElementById('active-campaigns');
    
    if (gameState.activeCampaigns.length === 0) {
        campaignsList.innerHTML = '<p class="empty-state">У вас нет активных рекламных кампаний.</p>';
        return;
    }
    
    let html = '';
    gameState.activeCampaigns.forEach(campaign => {
        html += `
            <div class="campaign-item">
                <div class="campaign-info">
                    <h4>${getCampaignName(campaign.type)}</h4>
                    <div class="campaign-details">
                        <span>Осталось дней: ${campaign.daysLeft}</span>
                        <span>Эффект: +${campaign.effect} клиентов в день</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    campaignsList.innerHTML = html;
}

// Get campaign name by type
function getCampaignName(type) {
    switch(type) {
        case 'flyers': return 'Листовки';
        case 'online': return 'Реклама в интернете';
        case 'referral': return 'Акция "Приведи друга"';
        default: return 'Неизвестная кампания';
    }
}

// Start a marketing campaign
function startCampaign(campaignType) {
    let cost = 0;
    let effect = 0;
    let duration = 0;
    
    switch(campaignType) {
        case 'flyers':
            cost = 500;
            effect = 10;
            duration = 3;
            break;
        case 'online':
            cost = 2000;
            effect = 50;
            duration = 7;
            break;
        case 'referral':
            cost = 1000;
            effect = 30;
            duration = 5;
            break;
    }
    
    // Check if user has enough balance
    if (cost > gameState.balance) {
        showNotification('Недостаточно средств для запуска кампании!', 'error');
        return;
    }
    
    // Add campaign
    const campaign = {
        type: campaignType,
        effect: effect,
        daysLeft: duration
    };
    
    gameState.activeCampaigns.push(campaign);
    gameState.balance -= cost;
    
    // Update UI
    updateCampaigns();
    updateStats();
    showNotification(`Кампания "${getCampaignName(campaignType)}" запущена!`, 'success');
}

// Restock a product
function restockProduct(productId) {
    const product = gameState.products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Create a simple form for restocking
    const quantity = prompt(`Сколько единиц товара "${product.name}" вы хотите закупить?`, "10");
    
    if (quantity === null) return; // User cancelled
    
    const quantityNum = parseInt(quantity);
    
    if (isNaN(quantityNum) || quantityNum <= 0) {
        showNotification('Пожалуйста, введите корректное количество!', 'error');
        return;
    }
    
    const totalCost = product.cost * quantityNum;
    
    // Check if user has enough balance
    if (totalCost > gameState.balance) {
        showNotification('Недостаточно средств для закупки товара!', 'error');
        return;
    }
    
    // Update product
    product.quantity += quantityNum;
    gameState.balance -= totalCost;
    
    // Update UI
    updateInventory();
    updateStats();
    showNotification(`Товар "${product.name}" пополнен на ${quantityNum} единиц!`, 'success');
}

// Remove a product
function removeProduct(productId) {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return;
    
    const productIndex = gameState.products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) return;
    
    // Remove product
    gameState.products.splice(productIndex, 1);
    
    // Update UI
    updateInventory();
    updateStats();
    showNotification('Товар удален из ассортимента!', 'success');
}

// Start simulation
function startSimulation() {
    if (gameState.products.length === 0) {
        showNotification('Добавьте хотя бы один товар перед началом дня!', 'error');
        return;
    }
    
    gameState.simulationRunning = true;
    showNotification(`День ${gameState.dayCount} начался!`, 'info');
    
    // Run simulation
    simulateDay();
}

// Stop simulation
function stopSimulation() {
    gameState.simulationRunning = false;
    gameState.dayCount++;
    showNotification('День завершен!', 'info');
    
    // Process end of day
    processEndOfDay();
}

// Simulate a day
function simulateDay() {
    // Calculate base customers based on difficulty
    let baseCustomers = 10;
    
    switch(gameState.settings.difficulty) {
        case 'easy': baseCustomers = 15; break;
        case 'medium': baseCustomers = 10; break;
        case 'hard': baseCustomers = 5; break;
    }
    
    // Add customers from active campaigns
    gameState.activeCampaigns.forEach(campaign => {
        baseCustomers += campaign.effect;
    });
    
    // Add some randomness
    const customers = Math.floor(baseCustomers * (0.8 + Math.random() * 0.4));
    
    // Process customers
    processCustomers(customers);
    
    // Update UI
    updateStats();
    updateInventory();
}

// Process customers
function processCustomers(customers) {
    gameState.customers += customers;
    
    // Each customer has a chance to buy products
    let totalSales = 0;
    let totalProfit = 0;
    
    for (let i = 0; i < customers; i++) {
        // Determine how many products the customer will buy (0-3)
        const productsToBuy = Math.floor(Math.random() * 3);
        
        for (let j = 0; j < productsToBuy; j++) {
            // Select a random product
            if (gameState.products.length === 0) break;
            
            const randomIndex = Math.floor(Math.random() * gameState.products.length);
            const product = gameState.products[randomIndex];
            
            // Check if product is in stock
            if (product.quantity > 0) {
                // Sell the product
                product.quantity--;
                product.sold++;
                
                // Calculate profit
                const profit = product.price - product.cost;
                totalSales += product.price;
                totalProfit += profit;
            }
        }
    }
    
    // Update balance
    gameState.balance += totalSales;
    
    // Show sales notification
    if (totalSales > 0) {
        showNotification(`Продажи за день: ${totalSales}₽ (прибыль: ${totalProfit}₽)`, 'success');
    } else {
        showNotification('Сегодня не было продаж.', 'info');
    }
}

// Process end of day
function processEndOfDay() {
    // Update campaign days left
    gameState.activeCampaigns.forEach((campaign, index) => {
        campaign.daysLeft--;
        
        // Remove expired campaigns
        if (campaign.daysLeft <= 0) {
            showNotification(`Кампания "${getCampaignName(campaign.type)}" завершена!`, 'info');
            gameState.activeCampaigns.splice(index, 1);
        }
    });
    
    // Update UI
    updateCampaigns();
    
    // Auto save if enabled
    if (gameState.settings.autoSave) {
        saveGameState();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        document.body.appendChild(notification);
        
        // Add styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '4px';
        notification.style.color = 'white';
        notification.style.fontWeight = '500';
        notification.style.zIndex = '1000';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.transition = 'all 0.3s ease';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
    }
    
    // Set notification type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#F44336';
            break;
        case 'info':
        default:
            notification.style.backgroundColor = '#2196F3';
            break;
    }
    
    // Set message
    notification.textContent = message;
    
    // Show notification
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
    }, 3000);
}

// Save game state to localStorage
function saveGameState() {
    localStorage.setItem('smartShopState', JSON.stringify(gameState));
    showNotification('Игра сохранена!', 'success');
}

// Load game state from localStorage
function loadGameState() {
    const savedState = localStorage.getItem('smartShopState');
    
    if (savedState) {
        try {
            const parsedState = JSON.parse(savedState);
            
            // Update game state
            Object.assign(gameState, parsedState);
            
            // Update UI
            updateStats();
            updateInventory();
            updateCampaigns();
            
            // Update settings form values
            document.getElementById('shop-name').value = gameState.settings.shopName;
            document.getElementById('shop-type').value = gameState.settings.shopType;
            document.getElementById('difficulty').value = gameState.settings.difficulty;
            document.getElementById('simulation-speed').value = gameState.settings.simulationSpeed;
            document.getElementById('auto-save').checked = gameState.settings.autoSave;
            
            showNotification('Игра загружена!', 'success');
        } catch (error) {
            console.error('Error loading game state:', error);
            showNotification('Ошибка при загрузке сохраненной игры!', 'error');
        }
    }
}

// Применение темы Telegram
function applyTelegramTheme() {
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.themeParams.text_color || '#000000');
    document.documentElement.style.setProperty('--tg-theme-hint-color', tg.themeParams.hint_color || '#999999');
    document.documentElement.style.setProperty('--tg-theme-link-color', tg.themeParams.link_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.themeParams.button_color || '#2481cc');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.themeParams.button_text_color || '#ffffff');
    
    // Применение темной темы, если она активна в Telegram
    if (tg.themeParams.bg_color && tg.themeParams.bg_color.match(/^#[0-9a-f]{6}$/i) && 
        parseInt(tg.themeParams.bg_color.substring(1), 16) < 0x808080) {
        document.body.classList.add('tg-dark-theme');
    }
}

// Инициализация навигации
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            
            // Обновление активной кнопки
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Показать определенную секцию
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// Инициализация обработчиков событий
function initEventListeners() {
    // Обработчики для карточек курсов на главной
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course-id');
            openCourse(courseId);
            showSection('courses');
            
            // Обновление активной кнопки навигации
            document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
            document.querySelector('.nav-button[data-section="courses"]').classList.add('active');
        });
    });
}

// Открыть курс
function openCourse(courseId) {
    const course = courses[courseId];
    if (!course) return;
    
    // Обновление заголовка курса
    document.getElementById('course-title').textContent = course.title;
    
    // Очистка и заполнение списка уроков
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';
    
    course.lessons.forEach(lesson => {
        const lessonElement = document.createElement('div');
        lessonElement.className = `lesson-item ${lesson.completed ? 'lesson-completed' : ''} ${lesson.locked ? 'lesson-locked' : ''}`;
        lessonElement.innerHTML = `
            <div class="lesson-number">${lesson.id}</div>
            <div class="lesson-info">
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-duration">${lesson.duration}</div>
            </div>
            ${lesson.locked ? '<div class="lesson-lock-icon">🔒</div>' : ''}
        `;
        
        lessonElement.addEventListener('click', function() {
            if (!lesson.locked) {
                startLesson(courseId, lesson.id);
            } else {
                showSubscriptionMessage();
            }
        });
        
        lessonContainer.appendChild(lessonElement);
    });
    
    // Показать секцию просмотра курса
    showSection('course-view');
}

// Показать сообщение о необходимости подписки
function showSubscriptionMessage() {
    tg.showPopup({
        title: 'Урок заблокирован',
        message: 'Для доступа к этому уроку необходимо приобрести подписку',
        buttons: [{
            type: 'ok'
        }]
    });
}

// Начать урок
function startLesson(courseId, lessonId) {
    const course = courses[courseId];
    const lesson = course.lessons.find(l => l.id === lessonId);
    
    if (!lesson) return;
    
    // Создаем секцию для просмотра урока, если ее еще нет
    let lessonViewSection = document.getElementById('lesson-view');
    if (!lessonViewSection) {
        lessonViewSection = document.createElement('section');
        lessonViewSection.id = 'lesson-view';
        lessonViewSection.className = 'content-section';
        
        const mainContent = document.querySelector('.app-content');
        mainContent.appendChild(lessonViewSection);
    }
    
    // Заполняем секцию содержимым урока
    lessonViewSection.innerHTML = `
        <div class="lesson-navigation">
            <button class="back-button" onclick="backToCourseView()">← Назад к курсу</button>
            <h2>${lesson.title}</h2>
        </div>
        <div class="lesson-content">
            ${lesson.content ? lesson.content.text : 'Содержимое урока в разработке'}
        </div>
        <div class="lesson-actions">
            <button class="tg-button" onclick="startLessonTest(${courseId}, ${lessonId})">Пройти тест</button>
        </div>
    `;
    
    // Показываем секцию урока
    showSection('lesson-view');
    
    // Инициализируем FAQ, если они есть в уроке
    if (lesson.content && lesson.content.text.includes('faq-question')) {
        initFaqItems();
    }
}

// Вернуться к просмотру курса
function backToCourseView() {
    showSection('course-view');
}

// Запустить код в интерактивном элементе
function runCode() {
    const outputElement = document.getElementById('code-output');
    outputElement.innerHTML = 'Hello, World!';
    outputElement.style.display = 'block';
}

// Начать тест по уроку
function startLessonTest(courseId, lessonId) {
    // Находим тест, соответствующий уроку
    const test = Object.values(tests).find(t => t.courseId === parseInt(courseId) && t.lessonId === parseInt(lessonId));
    
    if (test) {
        startTest(test.id);
    } else {
        tg.showPopup({
            title: 'Тест недоступен',
            message: 'К сожалению, тест для этого урока еще не готов',
            buttons: [{
                type: 'ok'
            }]
        });
    }
}

// Начать тест
function startTest(testId) {
    const test = tests[testId];
    if (!test) return;
    
    // Обновление заголовка теста
    document.getElementById('test-title').textContent = test.title;
    
    // Очистка и заполнение контейнера теста
    const testContainer = document.getElementById('test-container');
    testContainer.innerHTML = '';
    
    test.questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'test-question';
        questionElement.innerHTML = `
            <div class="question-text">${index + 1}. ${question.text}</div>
            <div class="answer-options">
                ${question.options.map((option, optIndex) => `
                    <label class="answer-option">
                        <input type="radio" name="question-${question.id}" value="${optIndex}">
                        ${option}
                    </label>
                `).join('')}
            </div>
            <div class="question-feedback" id="feedback-${question.id}"></div>
        `;
        
        testContainer.appendChild(questionElement);
    });
    
    // Добавление обработчиков для вариантов ответов
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radioInput = this.querySelector('input[type="radio"]');
            if (radioInput) {
                radioInput.checked = true;
                
                // Удаление класса selected у всех опций в этой группе
                const name = radioInput.getAttribute('name');
                document.querySelectorAll(`input[name="${name}"]`).forEach(input => {
                    input.closest('.answer-option').classList.remove('selected');
                });
                
                // Добавление класса selected к выбранной опции
                this.classList.add('selected');
            }
        });
    });
    
    // Изменение кнопки отправки теста
    const submitButton = document.getElementById('submit-test');
    submitButton.textContent = 'Проверить ответы';
    submitButton.onclick = function() {
        checkTestAnswers(testId);
    };
    
    // Показать секцию просмотра теста
    showSection('test-view');
}

// Проверить ответы теста
function checkTestAnswers(testId) {
    const test = tests[testId];
    if (!test) return;
    
    let correctAnswers = 0;
    const totalQuestions = test.questions.length;
    
    // Проверяем каждый вопрос
    test.questions.forEach((question) => {
        const selectedOption = document.querySelector(`input[name="question-${question.id}"]:checked`);
        const feedbackElement = document.getElementById(`feedback-${question.id}`);
        
        if (selectedOption) {
            const selectedAnswer = parseInt(selectedOption.value);
            
            if (selectedAnswer === question.correctAnswer) {
                correctAnswers++;
                feedbackElement.textContent = '✓ Правильно!';
                feedbackElement.className = 'question-feedback correct';
            } else {
                feedbackElement.textContent = `✗ Неправильно. Правильный ответ: ${question.options[question.correctAnswer]}`;
                feedbackElement.className = 'question-feedback incorrect';
            }
        } else {
            feedbackElement.textContent = 'Вы не выбрали ответ';
            feedbackElement.className = 'question-feedback warning';
        }
    });
    
    // Вычисляем процент правильных ответов
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Сохраняем результат теста
    saveTestResult(testId, score);
    
    // Если это тест по уроку, отмечаем урок как пройденный
    if (test.courseId && test.lessonId) {
        markLessonAsCompleted(test.courseId, test.lessonId);
    }
    
    // Показываем результат
    tg.showPopup({
        title: 'Результат теста',
        message: `Вы ответили правильно на ${correctAnswers} из ${totalQuestions} вопросов (${score}%)`,
        buttons: [{
            type: 'ok'
        }]
    });
    
    // Изменяем кнопку на "Вернуться к тестам"
    const submitButton = document.getElementById('submit-test');
    submitButton.textContent = 'Вернуться к тестам';
    submitButton.onclick = function() {
        backToTests();
    };
}

// Отметить урок как пройденный
function markLessonAsCompleted(courseId, lessonId) {
    const course = courses[courseId];
    if (!course) return;
    
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    lesson.completed = true;
    
    // Добавляем в список пройденных уроков
    if (!userData.completedLessons.includes(`${courseId}-${lessonId}`)) {
        userData.completedLessons.push(`${courseId}-${lessonId}`);
        
        // Начисляем очки за прохождение урока (2 очка за каждый урок)
        addPoints(2);
        
        // Проверяем достижения
        checkAchievements(courseId, lessonId);
    }
    
    // Сохраняем данные пользователя
    saveUserData();
    
    // Обновляем отображение курса
    updateCourseProgress(courseId);
}

// Проверить достижения
function checkAchievements(courseId, lessonId) {
    const course = courses[courseId];
    if (!course) return;
    
    // Достижение за первый пройденный урок
    if (userData.completedLessons.length === 1) {
        addAchievement('Первый шаг', '🚀');
    }
    
    // Достижение за прохождение 5 уроков
    if (userData.completedLessons.length === 5) {
        addAchievement('Начинающий ученик', '📚');
    }
    
    // Достижение за прохождение 10 уроков
    if (userData.completedLessons.length === 10) {
        addAchievement('Прилежный ученик', '🎓');
    }
    
    // Достижение за прохождение 20 уроков
    if (userData.completedLessons.length === 20) {
        addAchievement('Эксперт', '🏆');
    }
    
    // Достижение за прохождение всех уроков в курсе
    const totalLessons = course.lessons.length;
    const completedLessonsInCourse = course.lessons.filter(l => l.completed).length;
    
    if (completedLessonsInCourse === totalLessons) {
        addAchievement(`Курс "${course.title}" завершен!`, '🎉');
    }
}

// Сохранить результат теста
function saveTestResult(testId, score) {
    const test = tests[testId];
    if (!test) return;
    
    // Проверяем, есть ли уже результат для этого теста
    const existingResultIndex = userData.testResults.findIndex(r => r.testId === testId);
    
    // Определяем, является ли это улучшением результата
    let isImprovement = false;
    
    if (existingResultIndex !== -1) {
        // Проверяем, улучшил ли пользователь свой результат
        isImprovement = score > userData.testResults[existingResultIndex].score;
        
        // Обновляем существующий результат
        userData.testResults[existingResultIndex].score = score;
        userData.testResults[existingResultIndex].date = new Date().toISOString();
    } else {
        // Добавляем новый результат
        userData.testResults.push({
            testId: testId,
            score: score,
            date: new Date().toISOString()
        });
        
        // Новый тест всегда считается "улучшением"
        isImprovement = true;
    }
    
    // Если это улучшение или новый результат, начисляем очки
    if (isImprovement) {
        // Начисляем очки в зависимости от результата (от 1 до 5 очков)
        const points = Math.max(1, Math.floor(score * 5));
        addPoints(points);
        
        // Проверяем достижения за тесты
        checkTestAchievements(testId, score);
    }
    
    // Сохраняем данные пользователя
    saveUserData();
}

// Проверить достижения за тесты
function checkTestAchievements(testId, score) {
    const test = tests[testId];
    if (!test) return;
    
    // Достижение за первый пройденный тест
    if (userData.testResults.length === 1) {
        addAchievement('Первый тест', '📝');
    }
    
    // Достижение за прохождение 3 тестов
    if (userData.testResults.length === 3) {
        addAchievement('Тестировщик', '✅');
    }
    
    // Достижение за прохождение всех тестов
    if (userData.testResults.length === Object.keys(tests).length) {
        addAchievement('Мастер тестов', '🏅');
    }
    
    // Достижение за отличный результат (более 90%)
    if (score >= 0.9) {
        addAchievement(`Отличный результат в тесте "${test.title}"`, '🌟');
    }
}

// Обновить прогресс курса
function updateCourseProgress(courseId) {
    const course = courses[courseId];
    if (!course) return;
    
    const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
    const totalLessons = course.lessons.length;
    
    // Обновляем отображение прогресса в списке курсов
    const courseItem = document.querySelector(`.course-item[data-course-id="${courseId}"]`);
    if (courseItem) {
        const progressElement = courseItem.querySelector('.course-progress');
        if (progressElement) {
            progressElement.textContent = `${completedLessons}/${totalLessons} уроков`;
        }
    }
}

// Вернуться к списку курсов
function backToCourses() {
    showSection('courses');
    
    // Обновление активной кнопки навигации
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.nav-button[data-section="courses"]').classList.add('active');
}

// Вернуться к списку тестов
function backToTests() {
    showSection('tests');
    
    // Обновление активной кнопки навигации
    document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.nav-button[data-section="tests"]').classList.add('active');
}

// Отправить результаты теста
function submitTest() {
    const testView = document.getElementById('test-view');
    const testTitle = document.getElementById('test-title').textContent;
    const testId = Object.values(tests).find(test => test.title === testTitle)?.id;
    
    if (!testId) return;
    
    // Сбор ответов
    const answers = [];
    const questions = document.querySelectorAll('.test-question');
    
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        const answer = selectedOption ? parseInt(selectedOption.value) : -1;
        
        answers.push({
            questionId: index + 1,
            answer: answer
        });
    });
    
    // Отправка данных в Telegram
    tg.sendData(JSON.stringify({
        action: 'submitTest',
        testId: testId,
        answers: answers
    }));
    
    // Показать уведомление
    tg.showPopup({
        title: 'Тест завершен',
        message: 'Ваши ответы отправлены на проверку',
        buttons: [{
            type: 'ok'
        }]
    });
    
    // Вернуться к списку тестов
    backToTests();
}

// Сохранить данные пользователя
function saveUserData() {
    localStorage.setItem('telegramMiniAppUserData', JSON.stringify(userData));
}

// Загрузить данные пользователя
function loadUserData() {
    const savedData = localStorage.getItem('telegramMiniAppUserData');
    
    if (savedData) {
        try {
            userData = JSON.parse(savedData);
            
            // Применяем сохраненные данные
            applyUserData();
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
        }
    }
    
    // Обновляем прогресс курсов
    updateAllCoursesProgress();
    
    // Обновляем профиль пользователя
    updateUserProfile();
}

// Применить данные пользователя
function applyUserData() {
    // Отмечаем пройденные уроки
    userData.completedLessons.forEach(lessonKey => {
        const [courseId, lessonId] = lessonKey.split('-').map(Number);
        
        if (courses[courseId]) {
            const lesson = courses[courseId].lessons.find(l => l.id === lessonId);
            if (lesson) {
                lesson.completed = true;
            }
        }
    });
}

// Обновить прогресс всех курсов
function updateAllCoursesProgress() {
    Object.keys(courses).forEach(courseId => {
        updateCourseProgress(parseInt(courseId));
    });
}

// Функция для обработки ролевых игр
function handleRolePlay(scenario, option) {
    let feedback = '';
    let isCorrect = false;
    
    switch(scenario) {
        case 'price':
            if (option === 3) {
                feedback = '<span class="correct">✓ Отлично!</span> Фокус на ценности — лучший способ работы с возражением о цене. Вы показываете готовность понять потребности клиента и подобрать оптимальное решение.';
                isCorrect = true;
            } else if (option === 1) {
                feedback = '<span class="warning">⚠️ Неплохо</span>, но такой ответ может звучать как заготовка. Лучше выяснить, что именно клиент считает дорогим и почему.';
            } else {
                feedback = '<span class="incorrect">✗ Осторожно</span>. Сразу предлагать скидку — значит обесценивать свой продукт. Сначала нужно показать ценность.';
            }
            break;
        // Можно добавить другие сценарии
    }
    
    const feedbackElement = document.getElementById('role-play-feedback');
    if (feedbackElement) {
        feedbackElement.innerHTML = feedback;
        feedbackElement.style.display = 'block';
        
        if (isCorrect) {
            feedbackElement.className = 'role-play-feedback correct-feedback';
        } else {
            feedbackElement.className = 'role-play-feedback ' + (option === 1 ? 'warning-feedback' : 'incorrect-feedback');
        }
    }
}

// Функция для расчета бюджета
function calculateBudget() {
    // Получаем значения доходов
    const salary = parseFloat(document.getElementById('income-salary').value) || 0;
    const additionalIncome = parseFloat(document.getElementById('income-additional').value) || 0;
    
    // Получаем значения расходов
    const housing = parseFloat(document.getElementById('expense-housing').value) || 0;
    const food = parseFloat(document.getElementById('expense-food').value) || 0;
    const transport = parseFloat(document.getElementById('expense-transport').value) || 0;
    const entertainment = parseFloat(document.getElementById('expense-entertainment').value) || 0;
    const other = parseFloat(document.getElementById('expense-other').value) || 0;
    
    // Рассчитываем итоги
    const totalIncome = salary + additionalIncome;
    const totalExpenses = housing + food + transport + entertainment + other;
    const balance = totalIncome - totalExpenses;
    
    // Обновляем отображение
    document.getElementById('total-income').textContent = totalIncome;
    document.getElementById('total-expenses').textContent = totalExpenses;
    document.getElementById('balance').textContent = balance;
    
    // Добавляем класс для стилизации баланса
    const balanceElement = document.getElementById('balance');
    if (balance > 0) {
        balanceElement.className = 'positive';
    } else if (balance < 0) {
        balanceElement.className = 'negative';
    } else {
        balanceElement.className = '';
    }
    
    // Показываем обратную связь
    const feedbackElement = document.getElementById('budget-feedback');
    
    if (balance < 0) {
        feedbackElement.innerHTML = '<span class="warning">⚠️ Внимание!</span> Ваши расходы превышают доходы. Рекомендуется пересмотреть бюджет и найти способы сократить расходы или увеличить доходы.';
        feedbackElement.className = 'budget-feedback warning-feedback';
    } else if (balance === 0) {
        feedbackElement.innerHTML = '<span class="neutral">ℹ️ Обратите внимание</span> Ваш бюджет сбалансирован, но не остается средств для сбережений. Рекомендуется выделить хотя бы 10-20% дохода на сбережения.';
        feedbackElement.className = 'budget-feedback neutral-feedback';
    } else {
        const savingsRate = (balance / totalIncome) * 100;
        
        if (savingsRate < 10) {
            feedbackElement.innerHTML = '<span class="info">ℹ️ Хороший старт</span> У вас положительный баланс, но рекомендуется увеличить норму сбережений до 10-20% от дохода.';
            feedbackElement.className = 'budget-feedback info-feedback';
        } else if (savingsRate < 20) {
            feedbackElement.innerHTML = '<span class="success">✓ Отлично!</span> Вы сберегаете более 10% своего дохода. Это хороший показатель финансовой дисциплины.';
            feedbackElement.className = 'budget-feedback success-feedback';
        } else {
            feedbackElement.innerHTML = '<span class="success">✓ Превосходно!</span> Вы сберегаете более 20% своего дохода. Вы на пути к финансовой независимости!';
            feedbackElement.className = 'budget-feedback success-feedback';
        }
    }
    
    feedbackElement.style.display = 'block';
}

// Функция для инициализации FAQ-вопросов
function initFaqItems() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        // Скрываем ответы по умолчанию
        const answer = question.nextElementSibling;
        if (answer && answer.classList.contains('faq-answer')) {
            answer.style.display = 'none';
        }
        
        // Добавляем обработчик клика
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            if (answer && answer.classList.contains('faq-answer')) {
                // Переключаем видимость ответа
                if (answer.style.display === 'none' || !answer.style.display) {
                    answer.style.display = 'block';
                    this.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                    // Меняем символ с + на -
                    this.style.setProperty('--faq-icon', '"-"');
                } else {
                    answer.style.display = 'none';
                    this.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                    // Меняем символ с - на +
                    this.style.setProperty('--faq-icon', '"+"');
                }
            }
        });
    });
}

// Функция для расчета инвестиций
function calculateInvestment() {
    // Получаем значения из полей ввода
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value) || 10000;
    const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value) || 1000;
    const annualReturn = parseFloat(document.getElementById('annual-return').value) || 7;
    const years = parseFloat(document.getElementById('investment-period').value) || 10;
    
    // Расчет
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    
    let futureValue = initialInvestment;
    for (let i = 0; i < totalMonths; i++) {
        futureValue = (futureValue + monthlyContribution) * (1 + monthlyRate);
    }
    
    const totalContributions = initialInvestment + (monthlyContribution * totalMonths);
    const totalInterest = futureValue - totalContributions;
    
    // Форматирование чисел
    const formatNumber = (num) => {
        return Math.round(num).toLocaleString('ru-RU') + ' ₽';
    };
    
    // Обновляем результаты
    document.getElementById('total-contributions').textContent = formatNumber(totalContributions);
    document.getElementById('total-interest').textContent = formatNumber(totalInterest);
    document.getElementById('final-amount').textContent = formatNumber(futureValue);
    
    // Показываем результаты
    document.getElementById('investment-result').style.display = 'block';
}

// Обновить профиль пользователя
function updateUserProfile() {
    // Обновляем имя пользователя
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = userData.name || 'Пользователь';
    }
    
    // Обновляем инициалы пользователя
    const userInitialsElement = document.getElementById('user-initials');
    if (userInitialsElement) {
        const initials = userData.name ? userData.name.charAt(0) : 'U';
        userInitialsElement.textContent = initials;
    }
    
    // Обновляем статистику
    updateUserStats();
    
    // Обновляем прогресс по курсам
    updateCourseProgressList();
    
    // Обновляем достижения
    updateAchievementsList();
}

// Обновить статистику пользователя
function updateUserStats() {
    // Количество пройденных уроков
    const completedLessonsCount = document.getElementById('completed-lessons-count');
    if (completedLessonsCount) {
        completedLessonsCount.textContent = userData.completedLessons.length;
    }
    
    // Количество открытых курсов
    const unlockedCoursesCount = document.getElementById('unlocked-courses-count');
    if (unlockedCoursesCount) {
        let count = 0;
        for (const courseId in courses) {
            if (isCourseUnlocked(parseInt(courseId))) {
                count++;
            }
        }
        unlockedCoursesCount.textContent = count;
    }
    
    // Количество доступных для открытия курсов
    const availableCoursesCount = document.getElementById('available-courses-count');
    if (availableCoursesCount) {
        let count = 0;
        for (const courseId in courses) {
            if (!isCourseUnlocked(parseInt(courseId)) && canUnlockCourse(parseInt(courseId))) {
                count++;
            }
        }
        availableCoursesCount.textContent = count;
    }
}

// Проверить, разблокирован ли курс
function isCourseUnlocked(courseId) {
    const course = courses[courseId];
    if (!course) return false;
    
    // Первый курс всегда разблокирован
    if (courseId === 1) return true;
    
    // Проверяем, есть ли хотя бы один пройденный урок в этом курсе
    return course.lessons.some(lesson => lesson.completed);
}

// Проверить, можно ли разблокировать курс
function canUnlockCourse(courseId) {
    // Проверяем, достаточно ли у пользователя очков для разблокировки курса
    // В данной реализации считаем, что для разблокировки курса нужно 10 очков
    return userData.points >= 10;
}

// Обновить список прогресса по курсам
function updateCourseProgressList() {
    const courseProgressList = document.getElementById('course-progress-list');
    if (!courseProgressList) return;
    
    // Очищаем список
    courseProgressList.innerHTML = '';
    
    // Добавляем прогресс по каждому курсу
    for (const courseId in courses) {
        const course = courses[courseId];
        
        // Создаем элемент прогресса курса
        const courseProgressItem = document.createElement('div');
        courseProgressItem.className = 'course-progress-item';
        
        // Заголовок курса
        const courseTitle = document.createElement('h4');
        courseTitle.className = 'course-progress-title';
        courseTitle.textContent = course.title;
        
        // Прогресс-бар
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress';
        
        // Вычисляем процент прогресса
        const totalLessons = course.lessons.length;
        const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
        const progressPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = `${progressPercent}%`;
        progressBar.setAttribute('role', 'progressbar');
        progressBar.setAttribute('aria-valuenow', progressPercent);
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        
        // Информация о прогрессе
        const progressInfo = document.createElement('div');
        progressInfo.className = 'd-flex justify-content-between';
        
        const progressText = document.createElement('span');
        progressText.textContent = `${completedLessons}/${totalLessons} уроков`;
        
        const progressPercText = document.createElement('span');
        progressPercText.textContent = `${Math.round(progressPercent)}%`;
        
        // Собираем элементы
        progressInfo.appendChild(progressText);
        progressInfo.appendChild(progressPercText);
        progressContainer.appendChild(progressBar);
        
        courseProgressItem.appendChild(courseTitle);
        courseProgressItem.appendChild(progressContainer);
        courseProgressItem.appendChild(progressInfo);
        
        // Добавляем в список
        courseProgressList.appendChild(courseProgressItem);
    }
}

// Обновить список достижений
function updateAchievementsList() {
    const achievementsList = document.getElementById('achievements-list');
    if (!achievementsList) return;
    
    // Очищаем список
    achievementsList.innerHTML = '';
    
    // Проверяем, есть ли достижения
    if (userData.achievements && userData.achievements.length > 0) {
        // Скрываем сообщение об отсутствии достижений
        const noAchievementsMessage = document.getElementById('no-achievements-message');
        if (noAchievementsMessage) {
            noAchievementsMessage.style.display = 'none';
        }
        
        // Добавляем достижения в список
        userData.achievements.forEach(achievement => {
            const achievementItem = document.createElement('div');
            achievementItem.className = 'achievement-item';
            
            const achievementIcon = document.createElement('div');
            achievementIcon.className = 'achievement-icon';
            achievementIcon.textContent = achievement.icon || '🏆';
            
            const achievementInfo = document.createElement('div');
            achievementInfo.className = 'achievement-info';
            
            const achievementTitle = document.createElement('div');
            achievementTitle.className = 'achievement-title';
            achievementTitle.textContent = achievement.title;
            
            const achievementDate = document.createElement('div');
            achievementDate.className = 'achievement-date';
            achievementDate.textContent = new Date(achievement.date).toLocaleDateString();
            
            achievementInfo.appendChild(achievementTitle);
            achievementInfo.appendChild(achievementDate);
            
            achievementItem.appendChild(achievementIcon);
            achievementItem.appendChild(achievementInfo);
            
            achievementsList.appendChild(achievementItem);
        });
    } else {
        // Показываем сообщение об отсутствии достижений
        const noAchievementsMessage = document.createElement('div');
        noAchievementsMessage.id = 'no-achievements-message';
        noAchievementsMessage.className = 'text-center text-muted py-3';
        noAchievementsMessage.textContent = 'У вас пока нет достижений. Начните проходить курсы и тесты!';
        
        achievementsList.appendChild(noAchievementsMessage);
    }
}

// Добавить достижение
function addAchievement(title, icon = '🏆') {
    const achievement = {
        title: title,
        icon: icon,
        date: new Date().toISOString()
    };
    
    if (!userData.achievements) {
        userData.achievements = [];
    }
    
    userData.achievements.push(achievement);
    saveUserData();
    updateAchievementsList();
    
    // Показываем уведомление о новом достижении
    showNotification(`Новое достижение: ${title}`, 'success');
}

// Добавить очки пользователю
function addPoints(points) {
    userData.points += points;
    saveUserData();
    
    // Показываем уведомление о начислении очков
    showNotification(`Получено ${points} очков!`, 'success');
}

// Добавляем обработчики событий для профиля пользователя
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Обработчик кнопки редактирования профиля
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            // Заполняем форму текущими данными
            const profileNameInput = document.getElementById('profile-name');
            if (profileNameInput) {
                profileNameInput.value = userData.name || '';
            }
            
            // Показываем модальное окно
            const editProfileModal = new bootstrap.Modal(document.getElementById('editProfileModal'));
            editProfileModal.show();
        });
    }
    
    // Обработчик кнопки сохранения профиля
    const saveProfileBtn = document.getElementById('save-profile-btn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            // Получаем новое имя пользователя
            const profileNameInput = document.getElementById('profile-name');
            if (profileNameInput) {
                userData.name = profileNameInput.value.trim() || 'Пользователь';
            }
            
            // Сохраняем данные пользователя
            saveUserData();
            
            // Обновляем профиль
            updateUserProfile();
            
            // Закрываем модальное окно
            const editProfileModal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
            if (editProfileModal) {
                editProfileModal.hide();
            }
            
            // Показываем уведомление
            showNotification('Профиль успешно обновлен!', 'success');
        });
    }
    
    // ... existing code ...
}); 

// Обработка нажатия кнопки назад в Telegram
function handleBackButton() {
    // Получаем активную секцию
    const activeSection = document.querySelector('.content-section.active');
    
    if (activeSection) {
        const sectionId = activeSection.id;
        
        // Если мы находимся в просмотре курса или теста, возвращаемся к списку
        if (sectionId === 'course-view') {
            backToCourses();
            return;
        }
        
        if (sectionId === 'test-view') {
            backToTests();
            return;
        }
        
        // Если мы находимся в любой другой секции, кроме главной, возвращаемся на главную
        if (sectionId !== 'home') {
            // Показываем главную секцию
            showSection('home');
            
            // Обновляем активную кнопку навигации
            const navButtons = document.querySelectorAll('.nav-button');
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-section') === 'home') {
                    btn.classList.add('active');
                }
            });
            
            // Скрываем кнопку назад в Telegram
            if (tg && tg.BackButton) {
                tg.BackButton.hide();
            }
        }
    }
} 