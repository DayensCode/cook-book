<template>
	<div class="layout flex">
		<el-form ref="formRef" hide-required-asterisk :model="formData" class="form-layout" :rules="rules">
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

			<el-button class="btn-light-green" type="primary" @click="login">Войти</el-button>
			<p class="bottom-info">Нет аккаунта? <router-link to="/sign-up">Зарегистрироваться</router-link></p>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { authService } from '@/service/authService';

import CustomInput from '@/components/CustomInput.vue';
import SvgIcon from '@/components/SvgIcon.vue';

const authStore = useAuthStore();
const router = useRouter();

const formRef = ref<FormInstance | null>(null);
const formData = reactive({
	name: '',
	password: '',
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

const rules: FormRules = {
	name: [{ required: true, validator: validateName, trigger: 'change' }],
	password: [{ required: true, validator: validatePass, trigger: 'change' }],
};

const login = async () => {
  if (!formRef.value) return;

  formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const { access_token } = await authService.login(formData.name, formData.password);

        authStore.setToken(access_token);
        authStore.setUsername(formData.name);

        router.push('/');
      } catch (err) {
        console.error(err);
        alert('Ошибка соединения с сервером');
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
