<template>
	<div class="layout">
		<button class="back-btn" @click="goBack">
			<p>Вернуться назад</p>
			<SvgIcon class="arrow-back" name="arrow-back" />
		</button>
		<el-form ref="formRef" hide-required-asterisk :model="formData" class="form-layout" :rules="rules">
			<el-form-item label="Электронная почта" prop="email">
				<CustomInput v-model="formData.email" required />
			</el-form-item>

			<el-form-item label="Пароль" prop="password">
				<CustomInput v-model="formData.password" type="password" required />
			</el-form-item>

			<el-button class="btn-light-green" type="primary" @click="login">Войти</el-button>
			<div class="sign-up-link">
				Нет аккаунта?
				<router-link to="/sign-up">Зарегистрироваться</router-link>
			</div>
		</el-form>
	</div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { getCurrentUser, loginUser } from '@/helpers/authorization';

export default {
	components: {
		CustomInput,
		SvgIcon,
	},

	data() {
		return {
			formRef: null,
			formData: {
				email: '',
				password: ''
			},
			rules: {
				email: [
					{ required: true, message: 'Введите email', trigger: 'change' },
					{ type: 'email', message: 'Некорректный email', trigger: 'change' }
				],
				password: [
					{ required: true, validator: this.validatePass, trigger: 'change' },
				],
			},
		};
	},

	inject: ["globalState"],
	methods: {
		login() {
			this.$refs.formRef.validate((valid) => {
				if (valid) {
					if (loginUser(this.formData.email, this.formData.password)) {
						const user = getCurrentUser();
						this.globalState.isAuthorized = true;
						this.globalState.isAdmin = user?.isAdmin || false;
						this.globalState.user = user
						alert("Вы успешно вошли!");
						this.$router.push("/");
					} else {
						alert("Неверные логин или пароль");
					}
				}
				else {
					alert("Ошибка валидации");
				}
			})
		},
		validatePass(rule, value, callback) {
			if (value === '') {
				callback(new Error('Введите пароль'));
			}
			else if (value.length < 8) {
				callback(new Error('Пароль должен содержать минимум 8 символов'));
			} else {
				callback();
			}
		},
		goBack() {
			window.history.back();
		},
		submitForm() {
			this.$refs.formRef.validate((valid) => {
				if (valid) alert('Форма валидна');
				else alert('Ошибка валидации');
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.layout {
	min-height: 48rem;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.form-layout {
	max-width: 300px;
	border: 1rem solid #e3cbbc;
	display: flex;
	flex-direction: column;
	gap: 10px;
	color: black;
	background-color: white;
	border-radius: 1rem;
	padding: 2rem;
}

.arrow-back {
	width: 50px;
	height: 30px;
	color: white;
}

.back-btn {
	cursor: pointer;
	color: white;
	border: 3px #e3cbbc solid;
	background-color: #e3cbbc;
	border-radius: 1rem;
	padding: 7px;
	position: absolute;
	left: 1rem;
	top: 1rem;
}
</style>