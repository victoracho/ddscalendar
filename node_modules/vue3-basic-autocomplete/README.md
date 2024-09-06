# vue-basic-autocomplete
A Basic Vue.js autocomplete component. (**Compatible with Vue.js 3**)

#### [Sandbox](https://jsfiddle.net/ovictorpereira/tk65ecL8/15/ "Sandbox")

## Installation
NPM
```bash
$ npm install vue3-basic-autocomplete
``` 
Register the component
```js
import { createApp } from 'vue'
import App from './App.vue'

import Vue3BasicAutocomplete from 'vue3-basic-autocomplete'

createApp(App)
.use(Vue3BasicAutocomplete)
.mount('#app')

``` 

## Usage
```html
<vue3-basic-autocomplete v-model="result" :options="items" trackby="name" input-class="form-control" />
```
```js
// COMPOSITION API
import { toRefs, reactive } from 'vue'
setup () {
    const data = reactive({
        items: [
            {name: 'Josh', id: 1},
            {name: 'David', id: 2},
            {name: 'Angela', id: 3},
            {name: 'Alfred', id: 4},
        ],
        result: '',
    });

    return {
        ...toRefs(data)
    }
}
```

## Available props

| Prop        | Type             | Default                | Description                                      |
|-------------|------------------|------------------------|--------------------------------------------------|
| options     | Array (required) |                        | Array of items to autocomplete                 |
| minlength   | Number           | 1                      | Min. length to start listing. If set to 0, all options will be listed on focus   |
| none-find    | String           | No matching results    | Default label when there are no matching results |
| trackby     | String           |                        | Required when you are using an array of objects  |
| placeholder | String           |                        | Placeholder                                      |
| disabled    | Boolean           |    false                    |                                       |
| list-max-height | String       |       300              | Max-heigth in px                                      |
| input-class     | String           |                  | Custom CSS class for the input. Since I am using Bootstrap, I set it as 'form-control' |
| clear-btn     | Boolean           |         false         | Shows a clear button appended to the input |


## Events
| Event    |  Description |
|----------|--------------|
| selected     |  Triggers when you select any item       |