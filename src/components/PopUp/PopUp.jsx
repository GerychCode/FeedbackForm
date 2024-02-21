import React, {useState} from 'react';
import "./PopUp.css";
import { useForm} from "react-hook-form";

function PopUp() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSent , setIsSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        reset
    } = useForm();
    const onSubmit = data => {
        reset();
        setPhoneNumber("");
        setIsSent(!!data);
    };

    const handleInputChange = (event) => {
        const inputPhoneNumber = event.target.value;
        const cleanedNumber = inputPhoneNumber.replace(/\D/g, '');

        if (cleanedNumber.length <= 3) {
            setPhoneNumber("+380");
        } else {
            const formattedNumber = `+380 ${cleanedNumber.slice(3, 5)} ${cleanedNumber.slice(5, 8)} ${cleanedNumber.slice(8, 10)} ${cleanedNumber.slice(10)}`.trim();
            setPhoneNumber(formattedNumber);
        }
    };

    return (
        <form className='popup-block' onSubmit={handleSubmit(onSubmit)}>
            <img src={process.env.PUBLIC_URL +  "/logo.svg"} alt='Логотип Національного музея історії України'/>
            <h1>Залишити заявку на зворотній зв'язок</h1>
            <div className="input-block">
                <input autoComplete="off" placeholder="Ім'я" type="text" alt="Введіть своє ім'я" {...register("Name", {
                    required: "Це поле є обов'язковим для заповнення"
                })}/>
                {errors.Name && <span className="error">{errors.Name.message}</span>}
            </div>
            <div className="input-block">
                <input autoComplete="off" placeholder="Прізвище" type="text" alt="Введіть своє ім'я" {...register("Surname", {
                    required: "Це поле є обов'язковим для заповнення"
                })}/>
                {errors.Surname && <span className="error">{errors.Surname.message}</span>}
            </div>
            <div className="input-block">
                <input maxLength={17} autoComplete="off" placeholder="Телефон" type="text" alt="Введіть своє ім'я" {...register("Phone", {
                    required: "Це поле є обов'язковим для заповнення",
                    pattern: {
                        value: /^(\+?380|\d{3})\s?(\d{2}|\(\d{2}\))\s?\d{3}\s?\d{2}\s?\d{2}$/,
                        message: "Введіть номер телефону у форматі +380xxxxxxxxx"
                    }
                })}
                       value={phoneNumber}
                       onChange={handleInputChange}
                       onFocus={(e) => setPhoneNumber(!phoneNumber ? "+380" : phoneNumber)}
                />
                {errors.Phone && <span className="error">{errors.Phone.message}</span>}
            </div>
            <div className="input-block">
                <input autoComplete="off" placeholder="Електронна пошта" type="text" alt="Введіть своє ім'я" {...register("Email", {
                    required: "Це поле є обов'язковим для заповнення",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Неправильна адреса електронної пошти"
                    }
                })}/>
                {errors.Email && <span className="error">{errors.Email.message}</span>}
            </div>
            <div className="input-block">
                <textarea autoComplete="off" placeholder="Докладно опишіть свою проблему" maxLength={2000} {...register("Description")}/>
            </div>
            <div className="input-block">
                <div className="checkbox-block">
                    <input id="data-processing" type="checkbox" {...register("dataProcessing", {
                        required: "Щоб надіслати форму, надайте згоду на обробку персональних даних."
                    })}/>
                    <label htmlFor="data-processing">Даю згоду на обробку моїх пероснальних даних</label>
                </div>
                {errors.dataProcessing && <span className="error">{errors.dataProcessing.message}</span>}
            </div>
            <input type="submit" alt="Надіслати данні" value="Надіслати"/>
            <input type="reset" alt="Надіслати данні" value="Очистити" onClick={e => clearErrors()}/>
            {isSent && <span>Дані успішно відправлені</span>}
        </form>
    );
}

export default PopUp;