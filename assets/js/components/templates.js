export default {
    //language=vue
    cup: `
      <div class="generator__main">
      <div class="generator__cup"></div>
      </div>
      <div class="generator__setting">
      <div class="generator__photo flex column">
        <p class="generator__text">
          Выберите файл изображения дизайна Вашего стакана.
        </p>
        <div class="generator__info">
          <p>
            Допустимые форматы:
            <span>jpg, gif, png</span>
          </p>
          <p>
            Максимальный размер:
            <span>10 МБ</span>
          </p>
        </div>
        <input type="file" id="fileInput">
        <button class="generator__button" style="border-radius:20px" data-click="setPage" data-name="setting">Выберите
          файл
        </button>
      </div>
      </div>
    `,
    //language=vue
    setting: `
      <div class="generator__main">
      <div class="generator__view flex center"></div>
      </div>
      <div class="generator__setting">
      <div class="generator__image flex column">
        <div class="generator__buttons flex column">
          <div class="generator__buttons-top flex">
            <button class="generator__button icon left"></button>
            <button class="generator__button icon right"></button>
            <button class="generator__button icon in"></button>
            <button class="generator__button icon out"></button>
          </div>
        </div>
        <div class="generator__text center">
          Размещение логотипа:
        </div>
        <div class="generator__logo-buttons flex">
          <div class="generator__button only active" data-click="changeButtonsEvent" data-type="only">С одной стороны
          </div>
          <div class="generator__button two" data-click="changeButtonsEvent">С двух сторон</div>
        </div>
        <div class="previews flex center">
          <div class="preview first active"></div>
          <div class="preview second"></div>
        </div>
        <div class="generator__button-wrap">
          <button style="width: 100%" class="generator__button result">Создать стакан</button>
        </div>
        <a class="generator__back" data-click="startPage">Назад</a>
      </div>
      </div>
    `,
    //language=vue
    result: `
      <div class="generator__result result flex">
      <div class="result-images flex column">
        <div class="result-images__image first" data-model="1" data-click="openResultTexture"></div>
        <div class="result-images__image second" data-model="2" data-click="openResultTexture"></div>
        <div class="result-images__image third" data-model="3" data-click="openResultTexture"></div>
        <div class="result-images__image four" data-model="4" data-click="openResultTexture"></div>
      </div>
      <div class="result-image">
        <div class="result-image__image">

        </div>
        <div class="result__control">
          <div class="result__control-top flex center">
            <button class="generator__button icon arrowLeft"></button>
            <button class="generator__button icon pause"></button>
            <button class="generator__button icon play"></button>
            <button class="generator__button icon arrowRight"></button>
          </div>
          <div class="result__control__bottom flex center">
            <a class="generator__home" data-click="twoPage"><span><</span> Назад</a>
            <button class="generator__button" data-click="openEmailForm">Отправить на e-mail</button>
          </div>
        </div>
      </div>
      </div>
    `,
    //language=vue
    email: `
      <div class="generator__email email">
      <div class="email__photos flex"></div>
      <form action="#" class="email__form flex column center">
        <label class="email__label-input">
          <span class="email__validate name">
            Необходимое поле
          </span>
          Введите имя
          <div class="email__input name"><input id="nameInput" type="text"></div>
        </label>
        <label class="email__label-input">
          <span class="email__validate email">
            Необходимое поле в формате email
          </span>
          Введите e-mail
          <div class="email__input email"><input id="emailInput" type="email"></div>
        </label>
        <label class="email__label-input">
          <span class="email__validate phone">
            Заполните поле
          </span>
          Введите телефон
          <div class="email__input phone"><input type="text" id="phoneInput" value="+7 "></div>
        </label>
        <button class="generator__button email">Получить фото на почту</button>
        
        <label class="email__label-checkbox">
          <span class="email__validate checkbox">
            Необходимое поле
          </span>
          <input type="checkbox" id="checkbox" hidden>
          <div class="email__checkbox" id="checkboxDiv"></div>
          С <span>политикой конфиденциальности</span> ознакомлен(а)
        </label>
      </form>
      </div>
    `,
}