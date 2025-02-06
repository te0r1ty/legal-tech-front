<template>
  <div class="offer-wrap">
    <h1 class="projectoffer-head1">ФОРМА ЗАЯВКИ</h1>
    <div class="slider-wrap">
      <label class="switch" for="checkbox">
        <input v-model="form.editProject" type="checkbox" id="checkbox" />
        <div class="slider"></div>
      </label>
      <p class="slider-text slider-text__add">ДОБАВИТЬ ПРОЕКТ</p>
      <p class="slider-text slider-text__edit">ИЗМЕНИТЬ СВЕДЕНИЯ</p>
    </div>
    <form class="form">
      <div class="form__block">
        <p class="form__name">Наименование Legaltech-проекта</p>
        <textarea v-model="form.projectName" class="form__input form__txt"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.projectName" class="error">
            {{ errors.projectName }}
          </p>
        </transition>
      </div>

      <div class="form__block">
        <p class="form__name">Ссылка на Legaltech-проект</p>
        <textarea v-model="form.link" class="form__input form__txt"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.link" class="error">
            {{ errors.link }}
          </p>
        </transition>
      </div>

      <div class="form__block">
        <p class="form__name">Сфера Legaltech-проекта</p>
        <select class="form__input form__select" v-model="form.sphere">
          <option v-for="opt in selectSphereMenu" :key="opt.id" :value="opt.val">
            {{ opt.name }}
          </option>
        </select>
        <transition name="fade" appear>
          <p v-if="errors.sphere" class="error sphere-error">
            {{ errors.sphere }}
          </p>
        </transition>
      </div>

      <div class="form__block margin-submit">
        <p class="form__name">Год запуска проекта</p>
        <input class="form__input" />
      </div>

      <div class="form__block">
        <p class="form__name">Описание Legaltech-проекта</p>
        <textarea
          v-model="form.description"
          class="form__input form__txt form__big-input"
          placeholder="Расскажите нам о вашем проекте"
        ></textarea>
        <transition name="fade" appear>
          <p v-if="errors.description" class="error">
            {{ errors.description }}
          </p>
        </transition>
      </div>

      <div class="form__block">
        <p class="form__name">Контакты и дополнительная информация</p>
        <textarea
          v-model="form.extras"
          class="form__input form__txt form__big-input"
          placeholder="Укажите вашу почту, телефон или иной способ с вами связаться"
        ></textarea>
        <transition name="fade" appear>
          <p v-if="errors.extras" class="error">
            {{ errors.extras }}
          </p>
        </transition>
      </div>
    </form>
    <button @click.prevent="submit" class="submit">Отправить заявку</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const selectSphereMenu = [
  { id: 0, val: '', name: 'Очистить выбор' },
  { id: 1, val: 'sph1', name: 'Сфера 1' },
  { id: 2, val: 'sph2', name: 'Сфера 2' },
  { id: 3, val: 'sph3', name: 'Сфера 3' },
  { id: 4, val: 'sph4', name: 'Сфера 4' },
  { id: 1, val: 'sph1', name: 'Сфера 1' },
  { id: 2, val: 'sph2', name: 'Сфера 2' },
  { id: 3, val: 'sph3', name: 'Сфера 3' },
  { id: 4, val: 'sph4', name: 'Сфера 4' },
  { id: 1, val: 'sph1', name: 'Сфера 1' },
  { id: 2, val: 'sph2', name: 'Сфера 2' },
]

const selectYearMenu = []
const todaysYear = new Date().getFullYear()
for (let minYear = 1950; minYear <= todaysYear; minYear++) {
  selectYearMenu.push({ id: minYear - 1950, val: minYear, name: `${minYear}` })
}
selectYearMenu.reverse()

const router = useRouter()

const form = ref({
  projectName: '',
  description: '',
  link: '',
  extras: '',
  sphere: '',
  editProject: false,
})

const errors = ref({
  projectName: '',
  description: '',
  link: '',
  extras: '',
  sphere: '',
})

const validateForm = (): boolean => {
  let isValid = true

  errors.value = {
    projectName: '',
    description: '',
    link: '',
    extras: '',
    sphere: '',
  }

  if (!form.value.projectName) {
    errors.value.projectName = 'Название проекта обязательно'
    isValid = false
  }
  if (!form.value.description) {
    errors.value.description = 'Описание проекта обязательно'
    isValid = false
  }
  if (!form.value.link) {
    errors.value.link = 'Ссылка на проект обязательна'
    isValid = false
  }
  if (!form.value.extras) {
    errors.value.extras = 'Контактные данные обязательны'
    isValid = false
  }
  if (!form.value.sphere) {
    errors.value.sphere = 'Сфера проекта обязательна'
    isValid = false
  }

  return isValid
}

const submit = (event: Event) => {
  if (!validateForm()) {
    event.preventDefault()
    return
  }

  router.push('/offer/success')
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-wrap: wrap;
  column-gap: 50px;

  &__name {
    font-size: 20px;
    letter-spacing: 0.05em;
    margin: 40px 0 20px 0;
  }

  &__block {
    margin-bottom: 15px;
  }

  &__input {
    background-color: #d9d9d9;
    border-radius: 4px;
    border-width: 1px;
    border-color: #5574f8;
    border-style: solid;
    width: 730px;
    height: 60px;
    font-size: 17px;
    letter-spacing: 0.05em;
  }

  &__big-input {
    height: 180px;
  }

  &__txt {
    resize: none;
    padding: 5px 5px;
  }

  &__select {
    padding: 5px 5px;
    width: 740px;
  }
}

.submit {
  transition: background-color 0.2s ease-in-out;
  width: 300px;
  height: 80px;
  background-color: var(--main-color);
  padding: 15px 30px;
  border-radius: 4px;
  border-width: 0;
  font-size: 25px;
  text-decoration: none;
  color: white;
  margin-top: 40px;

  &:hover {
    background-color: var(--hover-underline-color);
  }
}

.margin-submit {
  margin-bottom: 35px;
}

.projectoffer-head1 {
  padding-top: 162px;
  margin: 0 auto;
  text-align: left;
  margin: 0;
  font-size: 80px;
}
.offer-wrap {
  margin: 80px 8.3% 0 8.3%;
}

.error {
  position: absolute;
  font-size: 20px;
  color: rgb(160, 0, 0);
  margin: 0;
}
.error-active {
  opacity: 1;
  transform: translateY(0);
}
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.sphere-error {
  margin-top: 8px;
}

.slider-wrap {
  margin-top: 376px;
  height: 50px;
}
.switch {
  display: inline-block;
  position: relative;
  height: 50px;
  width: 606px;

  input {
    display: none;
  }
}
.slider {
  background-color: #d9d9d9;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  transition: 0.4s;
  border-radius: 4px;

  &::before {
    content: '';
    position: absolute;
    transition: 0.4s;
    background-color: var(--main-color);
    height: 50px;
    width: 273px;
    margin: 0;
    padding: 0;
    border-radius: 4px;
  }
}
#checkbox:checked + .slider:before {
  width: 310px;
  transform: translateX(297px);
}
.switch:has(input:checked) + .slider-text__add {
  color: black;
}
.switch:has(input:checked) ~ .slider-text__edit {
  color: white;
}
.slider-text {
  transition: 0.4s;
  position: relative;
  margin: 0;
  pointer-events: none;
  font-size: 20px;

  &__add {
    width: 213px;
    top: -44px;
    left: 30px;
    color: white;
  }

  &__edit {
    width: 250px;
    top: -67px;
    left: 335px;
    color: black;
  }
}
</style>
