<template>
  <div class="modal-shade">
    <div class="modal-wrap">
      <div class="modal-frame">
        <p>{{ props.prj.name }}</p>
        <div class="btns-wrap">
          <div class="btns-style exit-btn" @click="closeModal">Выйти</div>
          <div class="btns-style save-btn" @click="saveChanges">Сохранить изменения в проекте</div>
          <div v-if="!deletion" class="btns-style decline-btn" @click="deletion = true">
            Удалить проект
          </div>
          <div v-if="deletion">
            <p style="max-height: fit-content; margin-top: 0">Точно удалить проект?</p>
            <div style="display: flex; column-gap: 20px">
              <div class="btns-style exit-btn" @click="deletion = false">Нет</div>
              <div class="btns-style decline-btn" style="flex: 0.3 0.3 0" @click="deletePrj">
                Да
              </div>
            </div>
          </div>
        </div>
        <div class="edit-form-wrap">
          <p class="txt">Наименование Legaltech-проекта</p>
          <textarea v-model="prjData.name" class="form-textarea"></textarea> <br />

          <p class="txt">Сфера Legaltech-проекта</p>
          <select class="form__input form__select" v-model="prjData.sphere">
            <option class="opt" v-for="opt in selectSphereMenu" :key="opt.id" :value="opt.id">
              {{ opt.name }}
            </option>
          </select>
          <br />

          <p class="txt">Год запуска проекта</p>
          <select class="form__input form__select" v-model="prjData.yearOfLaunch">
            <option class="opt" v-for="year in selectYearMenu" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <br />

          <p class="txt">Владелец/разработчик продукта</p>
          <textarea v-model="prjData.owner" class="form-textarea contacts-textarea"></textarea>
          <br />

          <p class="txt">Контакты Legaltech-проекта</p>
          <textarea v-model="prjData.contacts" class="form-textarea contacts-textarea"></textarea>
          <br />

          <p class="txt">Ссылка на Legaltech-проект</p>
          <textarea v-model="prjData.link" class="form-textarea"></textarea> <br />

          <p class="txt">Описание Legaltech-проекта</p>
          <textarea v-model="prjData.description" class="form-textarea high-textarea"></textarea>
          <br />

          <p class="txt">Дополнительная информация</p>
          <textarea v-model="prjData.additional" class="form-textarea high-textarea"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getToken } from '@/auth/authService'
import { categoriesEndPoint, projectsEndPoint } from '@/constants/api-links'
import type { Prj } from '@/stores/projectsStore'
import { ref } from 'vue'

const props = defineProps<{ prj: Prj }>()

const deletion = ref(false)
const prjData = ref({
  id: props.prj.id,
  name: props.prj.name,
  sphere: props.prj.sphereId,
  yearOfLaunch: props.prj.years,
  owner: props.prj.owner,
  contacts: props.prj.contacts,
  link: props.prj.link,
  description: props.prj.description,
  additional: props.prj.additional,
})

interface selectSphereMenuRow {
  id: number
  name: string
}
const selectSphereMenu = ref<selectSphereMenuRow[]>([])
const fetchCategories = async () => {
  try {
    const response = await fetch(categoriesEndPoint, {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + btoa('holger:QU11OWIz'),
      },
    })

    if (!response.ok) throw new Error('Failed to fetch categories')

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
for (let minYear = 1950; minYear <= todaysYear; minYear++) selectYearMenu.value.push(minYear)
selectYearMenu.value.reverse()

const emits = defineEmits(['closeModal', 'closeWithChanges'])
function closeModal() {
  emits('closeModal')
}
function closeWithChanges() {
  emits('closeWithChanges')
}

async function saveRequest() {
  try {
    const response = await fetch(projectsEndPoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
      body: JSON.stringify({
        companyId: props.prj.originalId,
        name: prjData.value.name,
        description: prjData.value.description,
        categoryId: prjData.value.sphere,
        yearOfLaunch: prjData.value.yearOfLaunch,
        linkToProject: prjData.value.link,
        additionalInfo: prjData.value.additional,
        contacts: prjData.value.contacts,
        founder: prjData.value.owner,
        imageName: props.prj.imgurl,
      }),
    })

    if (!response.ok) throw new Error('Failed to edit project.')
  } catch (error) {
    console.error('Error editing project:', error)
  }
}
async function saveChanges() {
  await Promise.all([saveRequest()])
  closeWithChanges()
}

async function deletionRequest() {
  try {
    const response = await fetch(projectsEndPoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getToken(),
      },
      body: JSON.stringify({
        id: props.prj.originalId,
      }),
    })

    if (!response.ok) throw new Error('Failed to delete project.')
  } catch (error) {
    console.error('Error deleting project:', error)
  }
}
async function deletePrj() {
  await Promise.all([deletionRequest()])
  closeWithChanges()
}
</script>

<style scoped lang="scss">
.decline-btn {
  background-color: rgb(204, 2, 2);
}
.save-btn {
  background-color: #5574f8;
}
.exit-btn {
  background-color: grey;
}
.btns-style {
  cursor: pointer;
  flex: 1 1 0;
  font-size: 30px;
  text-align: center;
  align-content: center;
  border-radius: 10px;
  padding: 15px;
}
.btns-wrap {
  display: flex;
  justify-content: space-between;
  height: fit-content;
  column-gap: 100px;
}
.form {
  flex-wrap: wrap;
  column-gap: 50px;

  &__input {
    width: 99%;
    background-color: #d9d9d9;
    border-radius: 4px;
    border-width: 1px;
    border-color: #5574f8;
    border-style: solid;
    height: 40px;
    font-size: 17px;
    overflow: hidden;
  }

  &__select {
    padding: 5px;
  }
}
.opt {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.form-textarea {
  width: 98%;
  background-color: #d9d9d9;
  border-radius: 4px;
  border-width: 1px;
  border-color: #5574f8;
  border-style: solid;
  height: 28px;
  font-size: 17px;
  padding: 5px;
  resize: none;
}
.contacts-textarea {
  height: 100px;
}
.high-textarea {
  height: 200px;
}
.txt {
  font-size: 20px;
  margin-bottom: 5px;
}
.modal-frame {
  position: absolute;
  padding: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  width: clamp(700px, 70vw, 1300px);
  height: fit-content;
  row-gap: 0px;
  background-color: #ffffff;
  border-radius: 0.5rem;
}
.modal-wrap {
  top: 0;
  left: 0;
  position: absolute;
  margin-top: 100px;
  width: 100%;
  height: 100%;
}
.modal-shade {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
}
</style>
