import {TaskType} from '../utils/types';

const host = 'https://test.auto-dnevnik.ru';

const apiTask = {
  host: host,

  // проверка статуса запроса
  _getResponse(res: any) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`ошибка: ${res.status} - ${res.statusText}`);
    }
  },

  getTasks(deviceId: string) {
    return fetch(`${this.host}/get-tasks/${deviceId}`, {
      method: 'GET',
    }).then(res => this._getResponse(res));
  },

  createTask(data: TaskType) {
    return fetch(`${this.host}/create-task/${data.author}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        text: data.text,
        isImportant: data.isImportant,
        isDone: data.isDone,
      }),
    }).then(res => this._getResponse(res));
  },

  updateTask(data: TaskType) {
    return fetch(`${this.host}/update-task/${data.author}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: data._id,
        name: data.name,
        text: data.text,
        isImportant: data.isImportant,
        isDone: data.isDone,
      }),
    }).then(res => this._getResponse(res));
  },

  removeTask(deviceId: string, _id: string) {
    return fetch(`${this.host}/remove-task/${deviceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
      }),
    }).then(res => this._getResponse(res));
  },
};

export default apiTask;
