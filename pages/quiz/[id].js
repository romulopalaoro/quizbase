import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  /* <pre>
        {JSON.stringify(dbExterno.questions, null, 4)}
      </pre> */

  );
}

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split('___');
  const dbExterno = await fetch(`https://${projectName}.${gitHubUser}.vercel.app/api/db`)
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      } throw new Error('falha em pegar dados');
    })
    .then((respostaConvertidaEmObjeto) => respostaConvertidaEmObjeto);
  //   .catch((err) => {
  //     console.error(err);
  //   });
  // console.log('dbExterno', dbExterno);

  return {
    props: {
      dbExterno,
    }, // will be passed to the page component as props
  };
}
