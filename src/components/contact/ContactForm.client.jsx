import React, {useState} from 'react';
import {emailValidation} from '~/lib/utils';
import {getInputStyleClasses} from '../../lib/styleUtils';
import {fetchSync} from '@shopify/hydrogen';

export function ContactForm() {
  const initialState = {
    emailError: null,
    firstNameError: null,
    lastNameError: null,
    subjectError: null,
    messageError: null,
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(initialState);

  const handleValidation = (event) => {
    setError(initialState);
    const emptyInputError = "This field can't be empty";
    const newEmailError = emailValidation(event.currentTarget.email);
    let tempError = {};
    let isValid = true;

    if (newEmailError) {
      tempError['emailError'] = newEmailError;
      isValid = false;
    }
    if (firstName.length <= 0) {
      tempError['firstNameError'] = emptyInputError;
      isValid = false;
    }
    if (lastName.length <= 0) {
      tempError['lastNameError'] = emptyInputError;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempError['subjectError'] = emptyInputError;
      isValid = false;
    }
    if (message.length <= 0) {
      tempError['messageError'] = emptyInputError;
      isValid = false;
    }
    if (isValid == false) {
      setError({...tempError});
      return false;
    }
    return true;
  };

  // const getRequestBody = () => {
  //   const request = {
  //     body: JSON.stringify({
  //       firstname: firstName,
  //       lastname: lastName,
  //       email,
  //       subject,
  //       message,
  //     }),
  //     headers: {'Content-Type': 'application/json', lado: 'puti'},
  //     method: 'POST',
  //   };
  //   return request;
  // };

  const requestBody = {
    method: 'POST',
    body: JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      email,
      subject,
      message,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const isValid = handleValidation(event);
    if (isValid) {
      const response = await fetchSync('api/sendGrid', requestBody);
      if (response.ok) {
        console.log('OK');
      } else {
        const {error} = await response.json();
        console.log('ERORR', error);
      }
    }
  };

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-blue-500 mx-12"
    >
      <label
        htmlFor="firstName"
        className="text-gray-500 font-light mt-4 dark:text-gray-50"
      >
        First name<span className="text-red-500 dark:text-gray-50">*</span>
      </label>
      <div className="">
        <input
          className={`bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 ${getInputStyleClasses(
            error.firstNameError,
          )}`}
          type="text"
          required
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            setError({...error, firstNameError: null});
          }}
          name="firstName"
        />
        {!error.firstNameError ? (
          ''
        ) : (
          <p className={`text-red-500 text-xs`}>
            {error.firstNameError} &nbsp;
          </p>
        )}
      </div>

      <label
        htmlFor="lastName"
        className="text-gray-500 font-light mt-4 dark:text-gray-50"
      >
        Last name<span className="text-red-500 dark:text-gray-50">*</span>
      </label>
      <div className="">
        <input
          className={`bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 ${getInputStyleClasses(
            error.lastNameError,
          )}`}
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setError({...error, lastNameError: null});
          }}
          name="lastName"
        />
        {!error.lastNameError ? (
          ''
        ) : (
          <p className={`text-red-500 text-xs`}>{error.lastNameError} &nbsp;</p>
        )}
      </div>

      <label
        htmlFor="email"
        className="text-gray-500 font-light mt-4 dark:text-gray-50"
      >
        E-mail<span className="text-red-500">*</span>
      </label>
      <div className="">
        <input
          className={`bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 ${getInputStyleClasses(
            error.emailError,
          )}`}
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setError({...error, emailError: null});
          }}
        />
        {!error.emailError ? (
          ''
        ) : (
          <p className={`text-red-500 text-xs`}>{error.emailError} &nbsp;</p>
        )}
      </div>

      <label
        htmlFor="subject"
        className="text-gray-500 font-light mt-4 dark:text-gray-50"
      >
        Subject<span className="text-red-500">*</span>
      </label>
      <div className="">
        <input
          className={`bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 ${getInputStyleClasses(
            error.subjectError,
          )}`}
          type="text"
          name="subject"
          value={subject}
          required
          onChange={(e) => {
            setSubject(e.target.value);
            setError({...error, subjectError: null});
          }}
        />
        {!error.subjectError ? (
          ''
        ) : (
          <p className={`text-red-500 text-xs`}>{error.subjectError} &nbsp;</p>
        )}
      </div>

      <label
        htmlFor="message"
        className="text-gray-500 font-light mt-4 dark:text-gray-50"
      >
        Message<span className="text-red-500">*</span>
      </label>
      <div className="">
        <textarea
          className={`bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 ${getInputStyleClasses(
            error.messageError,
          )}`}
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setError({...error, messageError: null});
          }}
        ></textarea>
        {!error.messageError ? (
          ''
        ) : (
          <p className={`text-red-500 text-xs`}>{error.messageError} &nbsp;</p>
        )}
      </div>

      <div className="flex flex-row items-center justify-start">
        <button
          type="submit"
          className="px-10 mt-8 py-2 bg-[#130F49] text-gray-50 font-light rounded-md text-lg flex flex-row items-center"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
