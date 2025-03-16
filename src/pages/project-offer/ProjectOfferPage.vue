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
      <div class="flexsame">
        <p>Наименование Legaltech-проекта</p>
        <textarea v-model="form.projectName"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.projectName" class="error">
            {{ errors.projectName }}
          </p>
        </transition>
      </div>

      <div class="form__block flexsame">
        <p class="form__name">Сфера Legaltech-проекта</p>
        <select class="form__input form__select" v-model="form.sphere">
          <option class="opt" v-for="opt in selectSphereMenu" :key="opt.id" :value="opt.id">
            {{ opt.name }}
          </option>
        </select>
        <transition name="fade" appear>
          <p v-if="errors.sphere" class="error sphere-error">
            {{ errors.sphere }}
          </p>
        </transition>
      </div>

      <div class="flexsame">
        <p>Год запуска проекта</p>
        <select v-model="form.year">
          <option v-for="opt in selectYearMenu" :key="opt.id" :value="opt.year">
            {{ opt.year }}
          </option>
        </select>
        <transition name="fade" appear>
          <p v-if="errors.year" class="error">
            {{ errors.year }}
          </p>
        </transition>
      </div>
    </form>

    <form class="form">
      <div class="flexsame">
        <p>Владелец/разработчик продукта</p>
        <textarea v-model="form.link"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.link" class="error">
            {{ errors.link }}
          </p>
        </transition>
      </div>

      <div class="flexsame">
        <p>Контакты Legaltech-проекта</p>
        <textarea v-model="form.link"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.link" class="error">
            {{ errors.link }}
          </p>
        </transition>
      </div>

      <div class="flexsame">
        <p>Ссылка на Legaltech-проект</p>
        <textarea v-model="form.link"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.link" class="error">
            {{ errors.link }}
          </p>
        </transition>
      </div>
    </form>

    <form class="form">
      <div class="flexsame">
        <p>Описание Legaltech-проекта</p>
        <textarea v-model="form.description"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.description" class="error">
            {{ errors.description }}
          </p>
        </transition>
      </div>

      <div class="flexsame">
        <p>Дополнительная информация</p>
        <textarea v-model="form.extras"></textarea>
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

interface selectSphereMenuRow {
  id: number
  name: string
}
interface selectYearMenuRow {
  id: number
  year: number
}

const selectSphereMenu = ref<selectSphereMenuRow[]>([])
const req = new XMLHttpRequest()
req.open('GET', 'http://62.84.115.34:8080/categories')
req.responseType = 'json'
req.setRequestHeader('Authorization', 'Basic ' + btoa('holger:QU11OWIz'))
req.onload = () => {
  for (let index = 0; index < req.response.length; index++) {
    selectSphereMenu.value.push({ id: index, name: req.response[index].name })
  }
}
req.onerror = () => {
  console.log('ашибка')
}
req.send()

const selectYearMenu = ref<selectYearMenuRow[]>([])
const todaysYear = new Date().getFullYear()
for (let minYear = 1950; minYear <= todaysYear; minYear++) {
  selectYearMenu.value.push({ id: minYear - 1949, year: minYear })
}
selectYearMenu.value.reverse()

const router = useRouter()

const form = ref({
  projectName: '',
  description: '',
  link: '',
  extras: '',
  sphere: '',
  year: 0,
  editProject: false,
})

const errors = ref({
  projectName: '',
  description: '',
  link: '',
  extras: '',
  sphere: '',
  year: 0,
})

const validateForm = (): boolean => {
  let isValid = true

  errors.value = {
    projectName: '',
    description: '',
    link: '',
    extras: '',
    sphere: '',
    year: 0,
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

  console.log(form.value)

  router.push('/offer/success')
}
</script>

<style scoped lang="scss">
.opt {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.flexsame {
  flex: 1 1 0;
}
.form {
  display: flex;
  flex-wrap: wrap;
  column-gap: 50px;

  &__name {
    font-size: 20px;
    margin: 40px 0 20px 0;
  }

  &__block {
    margin-bottom: 15px;
  }

  &__input {
    width: 100%;
    background-color: #d9d9d9;
    border-radius: 4px;
    border-width: 1px;
    border-color: #5574f8;
    border-style: solid;
    height: 60px;
    font-size: 17px;
    overflow: hidden;
  }

  &__select {
    padding: 5px 5px;
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
