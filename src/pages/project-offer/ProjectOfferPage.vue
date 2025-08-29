<template>
  <div class="offer-wrap">
    <!--TODO Вынести в компоненты всё че можно-->
    <h1 class="projectoffer-head1">РЕДАКТИРОВАТЬ КАРТУ</h1>
    <div class="slider-wrap">
      <label class="switch" for="checkbox">
        <input v-model="form.editProject" type="checkbox" id="checkbox" />
        <div class="slider"></div>
      </label>
      <p class="slider-text slider-text__add">ДОБАВИТЬ ПРОЕКТ</p>
      <p class="slider-text slider-text__edit">ИЗМЕНИТЬ СВЕДЕНИЯ</p>
    </div>
    <div class="form">
      <div class="form__wrap flexsame" v-if="!form.editProject">
        <p class="form__name">Наименование Legaltech-проекта</p>
        <textarea class="form-textarea" v-model="form.projectName"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.projectName" class="error">
            {{ errors.projectName }}
          </p>
        </transition>
      </div>

      <div class="form__wrap flexsame" v-if="form.editProject">
        <p class="form__name">Выберите проект</p>
        <select class="form__input form__select" v-model="form.editedProjectId">
          <option class="opt" value="-1" disabled>Выберите проект</option>
          <option
            class="opt"
            v-for="pair in projectsStore.projectsNamesAndIds"
            :key="pair.id"
            :value="pair.id"
          >
            {{ pair.name }}
          </option>
        </select>
        <transition name="fade" appear>
          <p v-if="errors.editedProjectId" class="error sphere-error">
            {{ errors.editedProjectId }}
          </p>
        </transition>
      </div>

      <div class="form__wrap flexsame">
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
        <p class="form__name">Год запуска проекта</p>
        <select class="form__input form__select" v-model="form.year">
          <option class="opt" v-for="year in selectYearMenu" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
        <transition name="fade" appear>
          <p v-if="errors.year" class="error sphere-error">
            {{ errors.year }}
          </p>
        </transition>
      </div>
    </div>

    <div class="form">
      <div class="flexsame">
        <p class="form__name">Владелец/разработчик продукта</p>
        <textarea class="form-textarea" v-model="form.owner"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.owner" class="error">
            {{ errors.owner }}
          </p>
        </transition>
      </div>

      <div class="flexsame">
        <p class="form__name">Контакты Legaltech-проекта</p>
        <textarea class="form-textarea" v-model="form.contacts"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.contacts" class="error">
            {{ errors.contacts }}
          </p>
        </transition>
      </div>

      <div class="flexsame">
        <p class="form__name">Ссылка на Legaltech-проект</p>
        <textarea class="form-textarea" v-model="form.link"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.link" class="error">
            {{ errors.link }}
          </p>
        </transition>
      </div>
    </div>

    <div class="form">
      <div class="flexsame">
        <p class="form__name">Описание Legaltech-проекта</p>
        <textarea class="form-textarea big-textarea" v-model="form.description"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.description" class="error">
            {{ errors.description }}
          </p>
        </transition>
      </div>

      <div class="flexsame">
        <p class="form__name">Дополнительная информация</p>
        <textarea class="form-textarea big-textarea" v-model="form.extras"></textarea>
        <transition name="fade" appear>
          <p v-if="errors.extras" class="error">
            {{ errors.extras }}
          </p>
        </transition>
      </div>
    </div>

    <div class="img-btn-wrap">
      <label class="img-btn-lbl" for="upload-image-btn">{{ labelText }}</label>
      <input
        class="img-btn"
        @change="onFileChange"
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        id="upload-image-btn"
      />
      <transition class="img-btn-err" name="fade" appear>
        <p v-if="errors.imageName" class="error">
          {{ errors.imageName }}
        </p>
      </transition>
    </div>
    <button @click.prevent="submit" class="submit">Отправить заявку</button>
  </div>
</template>

<script setup lang="ts">
import {
  categoriesEndPoint,
  imageSendEndPoint,
  requestsEndPoint,
  requestsUpdateEndPoint,
} from '@/constants/api-links'
import { useProjectsStore } from '@/stores/projectsStore'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

interface selectSphereMenuRow {
  id: number
  name: string
}

const projectsStore = useProjectsStore()
useProjectsStore().fetchProjects()
const selectSphereMenu = ref<selectSphereMenuRow[]>([])

const fetchCategories = async () => {
  try {
    const response = await fetch(categoriesEndPoint, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + btoa('holger:QU11OWIz'),
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const data = await response.json()
    data.forEach((category: { id: number; name: string }) => {
      selectSphereMenu.value.push({ id: category.id, name: category.name })
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const fetchData = async () => {
  await Promise.all([fetchCategories()])
}

fetchData()

const selectYearMenu = ref<number[]>([])
const todaysYear = new Date().getFullYear()
for (let minYear = 1950; minYear <= todaysYear; minYear++) {
  selectYearMenu.value.push(minYear)
}
selectYearMenu.value.reverse()

const router = useRouter()

const form = ref({
  projectName: '',
  editedProjectId: -1,
  sphere: 0,
  year: 0,
  owner: '',
  contacts: '',
  link: '',
  description: '',
  extras: '',
  imageName: '',
  editProject: false,
})

const errors = ref({
  projectName: '',
  editedProjectId: '',
  sphere: '',
  year: '',
  owner: '',
  contacts: '',
  link: '',
  description: '',
  extras: '',
  imageName: '',
})

const labelText = ref('Загрузить логотип: jpg, jpeg, png. Не менее 300x300 пикселей')

const formData = new FormData()
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement

  if (!input.files || input.files.length === 0) return

  const file: File = input.files[0]
  const img = new Image()
  const objectURL = URL.createObjectURL(file)

  img.onload = () => {
    if (img.width < 300 || img.height < 300) {
      errors.value.imageName = 'Неверное разрешение изображения. Не менее 300x300 пикселей'
    } else {
      formData.append('image', file)
      form.value.imageName = file.name
      labelText.value = `Выбран файл: ${file.name}`
      errors.value.imageName = ''
    }
    URL.revokeObjectURL(objectURL)
  }

  img.src = objectURL
}

const validateForm = (): boolean => {
  let isValid = true

  errors.value = {
    projectName: '',
    editedProjectId: '',
    sphere: '',
    year: '',
    owner: '',
    contacts: '',
    link: '',
    description: '',
    extras: '',
    imageName: '',
  }

  if (form.value.editProject) {
    if (!form.value.editedProjectId) {
      errors.value.editedProjectId = 'Это поле обязательно для заполнения'
      isValid = false
    }
  } else {
    if (!form.value.projectName) {
      errors.value.projectName = 'Это поле обязательно для заполнения'
      isValid = false
    }
  }
  if (!form.value.sphere) {
    errors.value.sphere = 'Это поле обязательно для заполнения'
    isValid = false
  }
  if (!form.value.year) {
    errors.value.year = 'Это поле обязательно для заполнения'
    isValid = false
  }
  if (!form.value.owner) {
    errors.value.owner = 'Это поле обязательно для заполнения'
    isValid = false
  }
  if (!form.value.contacts) {
    errors.value.contacts = 'Это поле обязательно для заполнения'
    isValid = false
  }
  if (!form.value.link) {
    errors.value.link = 'Это поле обязательно для заполнения'
    isValid = false
  }
  if (!form.value.description) {
    errors.value.description = 'Это поле обязательно для заполнения'
    isValid = false
  }
  if (!form.value.extras) {
    errors.value.extras = 'Это поле обязательно для заполнения'
    isValid = false
  }
  if (!form.value.imageName) {
    errors.value.imageName = 'Пожалуйста, загрузите ваш логотип'
    isValid = false
  }

  return isValid
}

const sendForm = async () => {
  try {
    const response = await fetch(
      form.value.editProject ? requestsUpdateEndPoint : requestsEndPoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa('holger:QU11OWIz'),
        },
        body: form.value.editProject
          ? JSON.stringify({
              companyId: form.value.editedProjectId,
              name: projectsStore.getProjectById(form.value.editedProjectId)?.name,
              description: form.value.description,
              categoryId: form.value.sphere,
              yearOfLaunch: form.value.year,
              linkToProject: form.value.link,
              additionalInfo: form.value.extras,
              contacts: form.value.contacts,
              founder: form.value.owner,
              imageName: form.value.imageName,
            })
          : JSON.stringify({
              name: form.value.projectName,
              description: form.value.description,
              categoryId: form.value.sphere,
              yearOfLaunch: form.value.year,
              linkToProject: form.value.link,
              additionalInfo: form.value.extras,
              contacts: form.value.contacts,
              founder: form.value.owner,
              imageName: form.value.imageName,
            }),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to send form.')
    }
  } catch (error) {
    console.error('Error sending form:', error)
  }
}

const sendImage = async () => {
  try {
    const response = await fetch(imageSendEndPoint, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa('holger:QU11OWIz'),
      },
      body: formData,
    })
    if (!response.ok) {
      throw new Error('Failed to send image.')
    }
  } catch (error) {
    console.error('Error sending image:', error)
  }
}

const submit = (event: Event) => {
  if (!validateForm()) {
    event.preventDefault()
    return
  }

  sendForm()
  sendImage()

  router.push('/offer/success')
}

watch(
  () => form.value.editedProjectId,
  () => {
    const chosenProject = projectsStore.getProjectById(form.value.editedProjectId)

    if (chosenProject) {
      form.value.projectName = chosenProject.name
      form.value.sphere = selectSphereMenu.value.find(
        (sphere) => sphere.name === chosenProject.sphere,
      )!.id
      form.value.year = chosenProject.years
      form.value.owner = chosenProject.owner
      form.value.contacts = chosenProject.contacts
      form.value.link = chosenProject.link
      form.value.description = chosenProject.description
      form.value.extras = chosenProject.additional
    }
  },
)
</script>

<style scoped lang="scss">
.img-btn-err {
  position: absolute;
  bottom: -30px;
}
.img-btn-wrap {
  display: flex;
  position: relative;
  justify-content: center;
}
.img-btn-lbl {
  display: block;
  width: fit-content;
  margin-top: 40px;
  background-color: #d9d9d9;
  color: #5574f8;
  padding: 10px 20px;
  border-radius: 4px;
  border-width: 1px;
  border-color: #5574f8;
  border-style: solid;
  cursor: pointer;
}
.img-btn {
  display: none;
}
.form-textarea {
  width: 98%;
  background-color: #d9d9d9;
  border-radius: 4px;
  border-width: 1px;
  border-color: #5574f8;
  border-style: solid;
  height: 48px;
  font-size: 17px;
  padding: 5px;
  resize: none;
}
.big-textarea {
  height: 200px;
}
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

  &__wrap {
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
    padding: 5px;
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
  margin: 40px 0;

  &:hover {
    background-color: var(--hover-underline-color);
  }
}

.margin-submit {
  margin-bottom: 35px;
}

.projectoffer-head1 {
  margin: 0 auto;
  text-align: left;
  font-size: 80px;
}
.offer-wrap {
  margin: 80px 8.3% 0 8.3%;
}

.error {
  font-size: 20px;
  color: rgb(160, 0, 0);
  margin: 0;
  width: 100%;
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
  margin-top: 80px;
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
