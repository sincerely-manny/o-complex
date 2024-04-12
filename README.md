✅ визуал по фигме [https://www.figma.com/file/XIYVl8ICFkdl3HJZcc8o8B/тестовое?type=design&node-id=0%3A1&mode=design&t=6xUI2e3VtlUzDocD-1](https://www.figma.com/file/XIYVl8ICFkdl3HJZcc8o8B/%D1%82%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5?type=design&node-id=0%3A1&mode=design&t=6xUI2e3VtlUzDocD-1)

✒️ *позволил себе не делать pizel perfect 🙃*

✅ должен быть адаптирован под мобильные устройства и планшеты

✅ наполнение контентом отзывов из html обернутого в json

✒️ *отзывы подгружаются на стороне сервера и стримятся через suspense*

✅ наполнение контентом товары по апи

    ✅ показывать первую страницу сразу 
    
    ✒️ *по идее можно было так же подгрузить их на сервере, а потом уже передать в react-query, но это много кода и едва ли сильно улучшит общую скорость загрузки*
    
    ✅ остальные страницы подгружать ajax запросом, по мере прокрутки вниз
    
    ✒️ *infinite query срабатывает за пару сотен пикселей до низа страницы*
    
✅ при нажатии на кнопку "купить", она должна меняться на кнопки + и - и поле для ввода кол-ва товара, значение поля должно быть 1, кнопки должны добавлять отбавлять товар, так же должна быть возможность вписать в поле для ввода любое кол-во

✅ при изменении кол-ва какого-либо из товаров должна меняться информация в корзине (та что над полем с телефоном)

✒️ *решил не тащить стейт-менеджер и обошелся контекстом, кастомным хуком и useEffect, который пишет-читает localStorage*

✅ набранные товары и введенный номер телефона должны сохраняться при перезагрузки страницы

✅ маска в поле для телефона 

✒️ *поэкспериментировал с маской – юзабилити паттерн получается некрасивый. Курсор скачет, ввод непредсказуемо прерывается, сдеать возможность нормально поменять что-то в середине уже введенного номера крайне сложно. В итоге органичился плейсхолдером и форматированием по blur* 

✅ при нажатии кнопки "заказать" идет проверка того что телефон полностью введен

    ✅ если всё хорошо - отправлять запрос на сервер
    
    ✅ если есть ошибки - подсветить соответствующие поля красным (поле номера телефона) 
    
    ✒️ *ограничился error message-ем*
✅ после отправки запроса и получения ответа от сервера отобразить попап что всё успешно (сделать попап в стиле самого сайта) 

✒️ *делать попап 1. довольно нудно 2. на мой вкус это не самый удачный паттерн. Мне показалось, что сообщение выполняет функцию лучше*

✅ добавить прилоадеры пока грузится контент.

✅ пофиксить xss атаку через контент отзывов 

✒️*с этим отлично справился sanitize-html*

✅ учесть возможность того что название товара может быть длиннее чем в дизайне.

✅ скорость загрузки сайта и скорость появления там контента (рекомендуется ssr)

✅ читабельность/поддерживаемость/расширяемость кода 

✒️ *не стал абстрагировать уж совсем все подряд, но постарался выдержать структуру*
