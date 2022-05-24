import api from '../services/api';

export async function authenticate(body) {
  try {
    const response = await api.post('/public/sessao', body, {});

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data.erro };
    }
  } catch (err) {
    console.log(err);
  }
}

export async function validation() {
  try {
    const response = await api.use();

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data.erro };
    }
  } catch (err) {
    console.log(err);
  }
}
