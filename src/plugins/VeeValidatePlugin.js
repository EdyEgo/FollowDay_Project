import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { required, email, min, url } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'


export default (app)=> {
    defineRule('required',required)
    defineRule('email',email)
    defineRule('min',min)
    defineRule('url',url)


    configure({
        generateMessage:localize('en',{
               messages:{
                   required:'{field} this field is veeeeeery required',
                   email: '{field} must be a sooo valid email',
                   min: '{field} must be a minimum of 0:{min} characters',
                   url: '{field} must be a valid URL'
               }
        })
    })

    


    app.component('VeeForm',Form)
    app.component('VeeField',Field)
    app.component('VeeErrorMessage',ErrorMessage)
}
