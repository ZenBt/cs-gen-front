<template>

  <div id="app">

    <h1>{{ msg }}</h1>


    <div>
      <select v-model="selected" class="custom-select">
        <option value="" disabled selected hidden>Тип (не выбрано)</option>
        <option v-for="task in tasks" v-bind:key="task" v-bind:value="{ id: task.id, text: task.name }">
          {{ task.name }}
        </option>
      </select>
    </div>

    <div v-if="selected.id == 0 || selected.id == 1 || selected.id == 2 || selected.id == 3">
      <h1> Количество задач </h1>
      <div class="input-container">
        <div class="omrs-input-group">
          <label class="omrs-input-underlined">
            <input type="integer" v-model="amount" placeholder="10">
            <span class="omrs-input-helper">Количество необходимых задач</span>
          </label>
        </div>
      </div>
    </div>

    <div v-if="(selected.id == 0 || selected.id == 1 || selected.id == 2 || selected.id == 3) && amount > 0">

      <md-button class="md-raised" v-on:click="gen"> Сгенерировать </md-button>
    </div>

    <div v-if="recieved_tasks.length > 0">
      <h1> Сгенерированные задачи </h1>
      <ul>
        <li v-for="(task, index) in recieved_tasks" :key="index">
          <p v-html="task.description" class="task-desk"></p>
          {{ log(index) }}
          <md-button class="md-raised" v-on:click="with_answers.push(index)">
            <p v-if="with_answers.indexOf(index) > -1">Ответ: {{ task.answer }}</p>
            <p v-else>
              Показать ответ
            </p>
          </md-button>


        </li>
      </ul>
    </div>
  </div>
<!-- </div> -->
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      msg: 'Добрый день! Выберите тип задачи',
      tasks: [
        { id: 0, name: 'Задачи на кодировки' },
        { id: 1, name: 'Задачи на абсолютный путь' },
        { id: 2, name: 'Задача на хранение информации'},
        { id: 3, name: 'Задача на передачу информации'}
      ],
      selected: '',
      amount: undefined,
      recieved_tasks: [],
      with_answers: []

    }
  },
  methods: {
    gen: function () {
      if (this.amount > 50) {
        alert('Количество задач не может превышать 50');
        return;
      }
      axios.post('http://localhost:8000/api/task/', {
        task_type: this.selected.id,
        amount: this.amount
      })
        .then(response => {
          this.recieved_tasks = response.data;
          this.with_answers = [];
        })
        .catch(error => {
          console.log(error);
        });
    },
    log: function (index) {
      console.log(this.with_answers);
      console.log(index);
      console.log(this.with_answers.indexOf(index) > -1);
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 70%;
  margin: auto;
  height: 1000px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

div.input-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin-top: 30px;
  border: 1px solid whitesmoke;
  padding: 21px;
  border-radius: 4px;
}

:root {
  --omrs-color-ink-lowest-contrast: rgba(47, 60, 85, 0.18);
  --omrs-color-ink-low-contrast: rgba(60, 60, 67, 0.3);
  --omrs-color-ink-medium-contrast: rgba(19, 19, 21, 0.6);
  --omrs-color-interaction: #1e4bd1;
  --omrs-color-interaction-minus-two: rgba(73, 133, 224, 0.12);
  --omrs-color-danger: #b50706;
  --omrs-color-bg-low-contrast: #eff1f2;
  --omrs-color-ink-high-contrast: #121212;
  --omrs-color-bg-high-contrast: #ffffff;

}

/** END: Non Openmrs CSS **/
div.omrs-input-group {
  margin-bottom: 1.5rem;
  position: relative;
  width: 20.4375rem;
}

/* Input*/
.omrs-input-underlined>input,
.omrs-input-filled>input {
  border: none;
  border-bottom: 0.125rem solid var(--omrs-color-ink-medium-contrast);
  width: 100%;
  height: 2rem;
  font-size: 1.0625rem;
  padding-left: 0.875rem;
  line-height: 147.6%;
  padding-top: 0.825rem;
  padding-bottom: 0.5rem;
}

.omrs-input-underlined>input:focus,
.omrs-input-filled>input:focus {
  outline: none;
}

.omrs-input-underlined>.omrs-input-label,
.omrs-input-filled>.omrs-input-label {
  position: absolute;
  top: 0.9375rem;
  left: 0.875rem;
  line-height: 147.6%;
  color: var(--omrs-color-ink-medium-contrast);
  transition: top .2s;
}

.omrs-input-underlined>svg,
.omrs-input-filled>svg {
  position: absolute;
  top: 0.9375rem;
  right: 0.875rem;
  fill: var(--omrs-color-ink-medium-contrast);
}

.omrs-input-underlined>.omrs-input-helper,
.omrs-input-filled>.omrs-input-helper {
  font-size: 0.9375rem;
  color: var(--omrs-color-ink-medium-contrast);
  letter-spacing: 0.0275rem;
  margin: 0.125rem 0.875rem;
}

.omrs-input-underlined>input:hover,
.omrs-input-filled>input:hover {
  background: var(--omrs-color-interaction-minus-two);
  border-color: var(--omrs-color-ink-high-contrast);
}

.omrs-input-underlined>input:focus+.omrs-input-label,
.omrs-input-underlined>input:valid+.omrs-input-label,
.omrs-input-filled>input:focus+.omrs-input-label,
.omrs-input-filled>input:valid+.omrs-input-label {
  top: 0;
  font-size: 0.9375rem;
  margin-bottom: 32px;
  ;
}

.omrs-input-underlined:not(.omrs-input-danger)>input:focus+.omrs-input-label,
.omrs-input-filled:not(.omrs-input-danger)>input:focus+.omrs-input-label {
  color: var(--omrs-color-interaction);
}

.omrs-input-underlined:not(.omrs-input-danger)>input:focus,
.omrs-input-filled:not(.omrs-input-danger)>input:focus {
  border-color: var(--omrs-color-interaction);
}

.omrs-input-underlined:not(.omrs-input-danger)>input:focus~svg,
.omrs-input-filled:not(.omrs-input-danger)>input:focus~svg {
  fill: var(--omrs-color-ink-high-contrast);
}

/** DISABLED **/

.omrs-input-underlined>input:disabled {
  background: var(--omrs-color-bg-low-contrast);
  cursor: not-allowed;
}

.omrs-input-underlined>input:disabled+.omrs-input-label,
.omrs-input-underlined>input:disabled~.omrs-input-helper {
  color: var(--omrs-color-ink-low-contrast);
}

.omrs-input-underlined>input:disabled~svg {
  fill: var(--omrs-color-ink-low-contrast);
}

.custom-select {
  margin: 20px;
  width: 300px;
  font-size: 16px;
  border: 2px solid #CCC;
  height: 30px;
}

.task-desk {

  font-size: 18px;

}

</style>
