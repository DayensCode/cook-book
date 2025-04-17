<template>
	<div class="layout flex">
		<el-form ref="formRef" hide-required-asterisk :rules="rules" :model="formData" class="form-layout">
      <div class="flex auth-top">
        <SvgIcon class="go-back" name="go-back" @click="goBack" />
        <h2>Добро пожаловать!</h2>
      </div>
			<el-form-item label="Имя" prop="name">
				<CustomInput v-model="formData.name" />
			</el-form-item>
			<el-form-item label="Пароль" prop="password">
				<CustomInput v-model="formData.password" type="password" />
			</el-form-item>
			<el-form-item label="Повторный ввод пароля" prop="passwordCheck">
				<CustomInput v-model="formData.passwordCheck" type="password" />
			</el-form-item>

			<el-button class="btn-light-green" type="primary" @click="submitForm">Зарегистрироваться</el-button>
      <p class="bottom-info">Уже зарегестрированы? <router-link to="/authorization">Войти</router-link></p>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';

import CustomInput from '@/components/CustomInput.vue';
import SvgIcon from '@/components/SvgIcon.vue';

const router = useRouter();

const formRef = ref<FormInstance | null>(null);
const formData = reactive({
	name: '',
	password: '',
	passwordCheck: '',
});

const validateName = (rule: any, value: string, callback: (error?: Error) => void) => {
	if (value === '') {
		callback(new Error('Введите имя'));
	} else if (value.length < 5) {
		callback(new Error('Имя должно быть не менее 5 символов'));
	} else {
		callback();
	}
};

const validatePass = (rule: any, value: string, callback: (error?: Error) => void) => {
	if (value === '') {
		callback(new Error('Введите пароль'));
	} else if (value.length < 8) {
		callback(new Error('Пароль должен содержать минимум 8 символов'));
	} else {
		callback();
	}
};

const validatePassCheck = (rule: any, value: string, callback: (error?: Error) => void) => {
	if (value === '') {
		callback(new Error('Введите пароль повторно'));
	}  else if (value !== formData.password) {
		callback(new Error('Пароли не совпадают'));
	} else {
		callback();
	}
};

const rules: FormRules = {
	name: [{ required: true, validator: validateName, trigger: 'change' }],
	password: [{ required: true, validator: validatePass, trigger: 'change' }],
	passwordCheck: [{ required: true, validator: validatePassCheck, trigger: 'change' }],
};

const submitForm = async () => {
  if (!formRef.value) return;

  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const response = await fetch('http://localhost:8080/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: formData.name,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.detail || 'Ошибка регистрации');
          return;
        }

        router.push('/authorization');
      } catch (err) {
        console.error(err);
        alert('Пользователь уже существует!');
      }
    } else {
      alert('Ошибка валидации');
    }
  });
};

const goBack = () => {
	window.history.back();
};
</script>

<style lang="scss">
.layout {
	min-height: 48rem;
	height: 100vh;
	flex-direction: column;
  background-color: #E3CBBC;
}

.form-layout {
	width: 352px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	color: #2F2F2F;
	padding: 2rem;

  .auth-top {
    justify-content: flex-start;
    gap: 30px;
    color: #2F2F2F;
  }

  .bottom-info {
    text-align: center;
    color: #8B8B8B;
    font-size: 16px;
  }
}
</style>
