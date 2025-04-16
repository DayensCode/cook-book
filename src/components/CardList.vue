<template>
  <div class="container">
    <div class="content">
      <div class="aside">
        <h3>добавь свой рецепт</h3>
        <input type="text" placeholder="Введите название" v-model="asideTitle" />
        <button @click="openModal">Создать</button>
      </div>

      <div class="card-list">
        <div v-if="loading" class="no-value">Загрузка...</div>
        <div v-if="error" class="no-value">{{ error }}</div>
        <div v-if="recipes?.length">
          <TheCard
            v-for="recipe in recipes"
            :key="recipe.id"
            :title="recipe.title"
            :category="recipe.dish_type.name"
            :instruction="recipe.content"
            :time="recipe.cooking_time"
          />
        </div>
      </div>
    </div>

    <BaseModal
      v-if="isModalOpen"
      @close="isModalOpen = false"
      :handleClose="handleCloseForm"
    >
      <div :class="step === 1 ? 'flex' : 'flex modal-top'">
        <SvgIcon v-if="step !== 1" class="go-back" name="go-back" @click="goToPrevStep" />
        <h2 class="modal-title">Ваш новый рецепт</h2>
      </div>
      <el-form
        class="recipe-form"
        :model="form"
        :rules="rules"
        label-position="top"
      >
        <template v-if="step === 1">
          <el-form-item label="Название" prop="title">
            <el-input v-model="form.title" placeholder="Введите название рецепта" />
          </el-form-item>

          <div class="form-row">
            <el-form-item label="Время готовки (часы)" prop="hours">
              <el-input-number v-model="form.hours" :min="0" />
            </el-form-item>
            <el-form-item label="(минуты)" prop="minutes">
              <el-input-number v-model="form.minutes" :min="0" :max="59" />
            </el-form-item>
          </div>

          <el-form-item label="Фото готового блюда" class="upload-field">
            <el-upload
              drag
              action="#"
              :auto-upload="false"
              v-model:file-list="form.image"
              accept="image/*"
            >
              <div class="el-upload__text">Перетащите файл сюда <br /><em>или выберите</em></div>
            </el-upload>
          </el-form-item>

          <el-form-item label="Категория" prop="category">
            <el-select v-model="form.category" placeholder="Выберите категорию">
              <el-option
                v-for="option in categoryOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="Национальная кухня" prop="cuisine">
            <el-select v-model="form.cuisine" placeholder="Выберите кухню">
              <el-option
                v-for="option in cuisineOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button class="submit-button" type="success" @click="goToNextStep" :disabled="!isCurrentStepValid">
              Далее
            </el-button>
          </el-form-item>
        </template>

        <template v-else-if="step === 2">
          <el-form-item label="Ингредиенты" class="flex-container" prop="ingredients">
            <div v-for="(ingredient, index) in form.ingredients" :key="index" class="item-row">
              <el-input v-model="form.ingredients[index]" placeholder="Введите ингредиент" />
              <el-button v-if="form.ingredients.length > 3" @click="removeIngredient(index)" text>
                <SvgIcon class="close" name="close" />
              </el-button>
            </div>
            <el-button @click="addIngredient" class="add-ingredient-button" text>
              <SvgIcon class="plus" name="plus" />
              Добавить ингредиент
            </el-button>
          </el-form-item>
          <el-form-item label="Хэштеги">
            <div class="hashtag-wrapper">
              <el-button
                v-for="tag in availableHashtags"
                :key="tag.id"
                :type="form.hashtags.includes(tag.id) ? 'success' : 'info'"
                @click="toggleHashtag(tag.id)"
                round
                size="small"
                class="hashtag-button"
              >
                # {{ tag.label }}
              </el-button>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button class="submit-button" type="success" @click="goToNextStep" :disabled="!isCurrentStepValid">
              Далее
            </el-button>
          </el-form-item>
        </template>

        <template v-else-if="step === 3">
          <el-form-item label="Пошаговое приготовление" class="flex-container" prop="instructions">
            <div v-for="(instruction, index) in form.instructions" :key="index" class="item-row">
              <el-input
                v-model="form.instructions[index]"
                type="textarea"
                :rows="3"
                :placeholder="`Шаг ${index + 1}: опишите, как приготовить блюдо`"
              />
              <el-button v-if="form.instructions.length > 3" @click="removeInstruction(index)" text>
                <SvgIcon class="close" name="close" />
              </el-button>
            </div>
            <el-button @click="addInstruction" text>
              <SvgIcon class="plus" name="plus" />
              Добавить шаг
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button class="submit-button" type="success" @click="submitForm" :disabled="!isCurrentStepValid">
              Отправить на модерацию
            </el-button>
          </el-form-item>
        </template>

      </el-form>

      <div class="step-indicators">
        <button
          v-for="n in 3"
          :key="n"
          class="indicator"
          :class="{ active: step === n }"
        />
      </div>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ElNotification } from 'element-plus';
import type { FormRules } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useRecipeStore } from '@/store/index';

import TheCard from "./TheCard.vue";
import BaseModal from "./BaseModal.vue";
import SvgIcon from './SvgIcon.vue';

const recipeStore = useRecipeStore();
const { recipes, error, loading } = storeToRefs(recipeStore);

const asideTitle = ref('');
const isModalOpen = ref(false);
const step = ref(1);

interface IRecipeForm {
  title: string;
  hours: number;
  minutes: number;
  image: File[];
  category: string;
  cuisine: string;
  ingredients: string[];
  hashtags: number[];
  instructions: string[];
}

const form = ref<IRecipeForm>({
  title: '',
  hours: 0,
  minutes: 0,
  image: [],
  category: '',
  cuisine: '',
  ingredients: ['', '', ''],
  hashtags: [],
  instructions: ['', '', ''],
})

const rules: FormRules = {
  title: [{ required: true, message: 'Введите название рецепта', trigger: 'blur' }],
  hours: [{ required: true, message: 'Укажите часы', trigger: 'change' }],
  minutes: [{ required: true, message: 'Укажите минуты', trigger: 'change' }],
  category: [{ required: true, message: 'Выберите категорию', trigger: 'change' }],
  cuisine: [{ required: true, message: 'Выберите кухню', trigger: 'change' }],
  ingredients: [{ required: true, message: 'Введите ингредиент', trigger: 'blur' }],
  instructions: [{ required: true, message: 'Опишите, как приготовить блюдо', trigger: 'blur' }],
}

const categoryOptions = [
  { label: 'Основное блюдо', value: '3' },
  { label: 'Суп', value: '1' },
  { label: 'Салат', value: '2' },
  // { label: 'Закуска', value: 'snack' },
  // { label: 'Выпечка/десерт', value: 'dessert' },
  // { label: 'Напиток', value: 'drink' },
];

const cuisineOptions = [
  { label: 'Итальянская', value: '1' },
  { label: 'Русская', value: '3' },
  { label: 'Японская', value: '4' },
  { label: 'Грузинская', value: '5' },
  // { label: 'Мексиканская', value: '6' },
];

const availableHashtags = [
  { id: 1, label: 'Вегетарианский' },
  { id: 2, label: 'Быстрый' },
  { id: 3, label: 'Домашний' },
  { id: 4, label: 'Острый' },
  { id: 5, label: 'Здоровый' },
  { id: 6, label: 'Сезонный' },
];

const isCurrentStepValid = computed(() => {
  if (step.value === 1) {
    return (
      form.value.title.trim() !== '' &&
      form.value.category !== '' &&
      form.value.cuisine !== '' &&
      (form.value.hours > 0 || form.value.minutes > 0)
    );
  }

  if (step.value === 2) {
    return form.value.ingredients.every(i => i.trim() !== '');
  }
  if (step.value === 3) {
    return form.value.instructions.every(i => i.trim() !== '');
  }

  return false;
});

const openModal = () => {
  form.value.title = asideTitle.value;
  isModalOpen.value = true;
};

const goToNextStep = () => {
  step.value++;
};

const goToPrevStep = () => {
  step.value--;
};

const addIngredient = () => {
  form.value.ingredients.push('');
};

const removeIngredient = (index: number) => {
  form.value.ingredients.splice(index, 1);
};

const addInstruction = () => {
  form.value.instructions.push('');
};

const removeInstruction = (index: number) => {
  form.value.instructions.splice(index, 1);
};

const toggleHashtag = (id: number) => {
  const tags = form.value.hashtags;
  if (tags.includes(id)) {
    form.value.hashtags = tags.filter(tag => tag !== id);
  } else {
    form.value.hashtags.push(id);
  }
};

const handleCloseForm = () => {
  step.value = 1;
  form.value = {
    title: '',
    hours: 0,
    minutes: 0,
    image: [],
    category: '',
    cuisine: '',
    ingredients: ['', '', ''],
    hashtags: [],
    instructions: ['', '', ''],
  };
  asideTitle.value = '';
}

const submitForm = async () => {
  const totalMinutes = form.value.hours * 60 + form.value.minutes;

  try {
    const payload = {
      title: form.value.title,
      cooking_time: totalMinutes,
      dish_type_id: +form.value.category,
      cuisine_id: +form.value.cuisine,
      content: `Ингредиенты: ${form.value.ingredients
        .map(ing => ing.toLowerCase())
        .join(', ')}. ${form.value.instructions.join('. ')}`,
      hashtags: form.value.hashtags,
    };

    const response = await fetch('http://localhost:8080/api/v1/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiZXhwIjoxNzQ0ODA5NjM2fQ.kERmPQo7Y1i6Y5XpjLrnNE8nfd1VnWqaYw-WZ8bRnNY`,
      },
      body: JSON.stringify(payload),
    });

    // вернуть когда бэк научится работать с FormData + правки на фронте
    // const formData = new FormData();
    // formData.append('title', form.value.title);
    // formData.append('cooking_time', totalMinutes);
    // formData.append('dish_type_id', +form.value.category);
    // formData.append('cuisine_id', +form.value.cuisine);
    // formData.append('content', `Ингредиенты: ${form.value.ingredients.map(ing => ing.toLowerCase()).join(', ')}. ${form.value.instructions.join('. ')}`);
    // formData.append('hashtags', JSON.stringify(form.value.hashtags));

    // const file = form.value.image[0]?.raw;
    // if (file) {
    //   formData.append('image', file);
    // }

    // const response = await fetch('http://localhost:8080/api/v1/recipes', {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiZXhwIjoxNzQ0NzExMjgyfQ.upa1J54BRoMverjVA09jZyH1IzR4TC0kapWwL30bO_o`,
    //   },
    //   body: formData,
    // });

    if (!response.ok) {
      throw new Error('Ошибка при отправке данных');
    }

    ElNotification({
      title: 'Готово!',
      message: 'Рецепт успешно отправлен на модерацию.',
      type: 'success',
      position: 'bottom-right',
    });

    isModalOpen.value = false;
    recipeStore.fetchRecipes();
    handleCloseForm();
  } catch (error) {
    console.error(error);
    ElNotification({
      title: 'Ошибка',
      message: 'Не удалось отправить рецепт. Попробуйте позже.',
      type: 'error',
      position: 'bottom-right',
    });
  }
};

onMounted(() => {
  recipeStore.fetchRecipes();
});
</script>

<style lang="scss" scoped>
.content {
  margin-top: 40px;
  display: flex;
  gap: 40px;
}

.aside {
  padding: 45px 35px 48px;
  height: fit-content;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background-image: url("../assets/img/aside.png");
  background-size: cover;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(213, 177, 155, 0.65);
    border-radius: 18px;
  }

  h3 {
    text-transform: uppercase;
    white-space: nowrap;
    position: relative;
    z-index: 2;
    font-size: 18px;
  }

  input {
    margin-top: 38px;
    padding: 15px 0 15px 15px;
    width: 100%;
    border: none;
    outline: none;
    border-radius: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    font-size: 16px;
  }

  button {
    margin-top: 22px;
    width: 100%;
    display: block;

    padding: 12px 0;
    background-color: #9bd5b1;
    border: none;
    border-radius: 20px;

    font-size: 18px;
    color: #fff;
    position: relative;
    z-index: 2;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #8ec6a3;
    }
  }
}

.card-list {
  flex: 1;
}

.modal-top {
  justify-content: flex-start;
  gap: 80px;
}

.go-back {
  width: 26px;
  height: 26px;
  cursor: pointer;
}

.modal-title {
  color: #2F2222;
}

.recipe-form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .form-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .submit-button {
    width: 100%;
    background-color: #9BD5B1;
    border: none;
    font-size: 18px;
    border-radius: 2rem;
    padding: 20px;
  }

  .el-button.is-disabled {
    background-color: #d3d3d3;
  }

  .item-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .close {
    width: 16px;
    height: 16px;
  }

  .plus {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  .add-ingredient-button {
    margin-top: 8px;
    padding: 8px 15px;
  }

  .hashtag-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .hashtag-button {
    padding: 16px 20px;
    font-size: 16px;
    cursor: pointer;
  }
}

.step-indicators {
  display: flex;
  justify-content: center;
}

.indicator {
  width: 8px;
  height: 8px;
  margin: 0 6px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: #d3d3d3;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: #9BD5B1;
}

:deep(.upload-field > .el-form-item__content > div) {
  width: 100%;
}

:deep(.flex-container > .el-form-item__content) {
  display: block;
  text-align: center;
}

:deep(.hashtag-wrapper > .el-button--success) {
  background-color: #9BD5B1;
  border-color: #9BD5B1;
}

.el-button+.el-button {
  margin-left: 0;
}
</style>
