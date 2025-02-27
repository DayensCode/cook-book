<template>
	<div class="layout">
		<button class="back-btn" @click="goBack">
			<p>Вернуться назад</p>
			<SvgIcon class="arrow-back" name="arrow-back" />
		</button>
		<el-form ref="formRef" require-asterisk-position="right" :rules="rules" :model="formData" class="form-layout">
			<el-form-item label="Имя" prop="first_name">
				<CustomInput v-model="formData.first_name" />
			</el-form-item>
			<el-form-item label="Фамилия" prop="last_name">
				<CustomInput v-model="formData.last_name" />
			</el-form-item>
			<el-form-item label="Отчество" prop="third_name">
				<CustomInput v-model="formData.third_name" />
			</el-form-item>
			<el-form-item label="Электронная почта" prop="email">
				<CustomInput v-model="formData.email" />
			</el-form-item>
			<el-form-item label="Пароль" prop="password">
				<CustomInput v-model="formData.password" type="password" />
			</el-form-item>
			<el-form-item label="Пароль повторно" prop="passwordCheck">
				<CustomInput v-model="formData.passwordCheck" type="password" />
			</el-form-item>

			<el-button class="btn-light-green" type="primary" @click="submitForm">Зарегистрироваться</el-button>
		</el-form>
	</div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { getCurrentUser, loginUser, registerUser } from '@/helpers/authorization';

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
				first_name: '',
				last_name: '',
				third_name: '',
				password: '',
				passwordCheck: '',
			},

			rules: {
				email: [
					{ required: true, message: 'Введите email', trigger: 'change' },
					{ type: 'email', message: 'Некорректный email', trigger: 'change' }
				],
				password: [
					{ required: true, validator: this.validatePass, trigger: 'change' },
				],
				passwordCheck: [
					{ required: true, validator: this.validatePassCheck, trigger: 'change' },
				],
			},
		};
	},

	inject: ["globalState"],
	methods: {
		validatePass(rule, value, callback) {
			if (value === '') {
				callback(new Error('Введите пароль повторно'))
			}
			else if (/[\u0400-\u04FF]/.test(value)) callback(new Error('Пароль не может содержать кириллические символы'));
			else if (!/[a-z]/.test(value)) callback(new Error('Пароль должен содержать латинские буквы в нижнем регистре'));
			else if (!/[A-Z]/.test(value)) callback(new Error('Пароль должен содержать латинские буквы в верхнем регистре'));
			else if (!/[0-9]/.test(value)) callback(new Error('Пароль должен содержать минимум одну цифру'));
			else if (value.length < 8) callback(new Error('Пароль должен быть не менее 8 символов'));
			else callback();
		},
		validatePassCheck(rule, value, callback) {
			if (value === '') {
				callback(new Error('Введите пароль повторно'));
			} else if (value !== this.formData.password) {
				callback(new Error('Пароли не совпадают'));
			} else {
				callback();
			}
		},
		goBack() {
			window.history.back();
		},
		submitForm() {
			this.$refs.formRef.validate((valid) => {
				if (valid) {
					if (registerUser(this.formData.email, this.formData.email, this.formData.password, this.formData.first_name, this.formData.last_name, this.formData.third_name)) {
						if (loginUser(this.formData.email, this.formData.email, this.formData.password, this.formData.first_name, this.formData.last_name, this.formData.third_name)) {
							const user = getCurrentUser();
							this.globalState.isAuthorized = true;
							this.globalState.isAdmin = user?.isAdmin || false;
						}
						alert("Вы успешно зарегистрированы!");
						this.$router.push("/authorization");

					} else {
						alert("Пользователь уже существует!");
					}
				} else {
					alert("Ошибка валидации");
				}
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
	width: 300px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	color: black;
	background-color: white;

	border: 1rem solid #e3cbbc;
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
	padding: 10px;
	position: absolute;
	left: 1rem;
	top: 1rem;
}
</style>
