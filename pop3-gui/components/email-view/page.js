let email = {
  from: 'person 2',
  subject: 'Test email',
  body: {__html: `Dear Student,

  This is a reminder to participate in the College Tobacco Survey, a research study being conducted by The University of Texas at Austin's Department of Kinesiology and Health Education.
  This anonymous survey:
<br>
<br>
<br>
<br>


  asks about your tobacco-related attitudes and behaviors, optional drug use items, and
  takes approximately 15 minutes to complete.
  Upon survey completion, you will have the opportunity to be entered into a prize drawing for one of fifty $20 gift cards to Amazon.com.

  <br>
  <br>
  The survey can be accessed at the link below:

  <br>
  <br>
  https://utexas.qualtrics.com/jfe/form/SV_afUUjIZJrBpqByC?Q_DL=wyyQNefkDY1OdNo_afUUjIZJrBpqByC_CGC_KiqTCPQY5edu4CH&Q_CHL=email
  <br>
  <br>

  NOTE: Please email peersagainsttobacco@gmail.com for all technical problems, questions, or concerns.
  Sincerely,
  Alexandra Loukas, Ph.D.
  Department of Kinesiology & Health Education
  The University of Texas at Austin
  Follow the link to opt out of future emails:
  Click here to unsubscribe

`},
  date: '2021-10-10T12:00:00Z'
}

export default function EmailView() {
  return (
    <div className="shadow-md ">
      <div id="title" className="w-full  mb-2 border-b p-3">
        <h1 className="text-lg mt-1" >{email.subject}</h1>
        <p className="text-sm">From: {email.from}</p>
      </div>
      <div className="text-sm p-3" dangerouslySetInnerHTML={email.body}></div>
    </div>
  );
}
