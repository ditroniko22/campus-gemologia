/* Evaluaciones de práctica: una respuesta por grupo, sin transmisión de datos. */
document.querySelectorAll('.quiz-form').forEach((form) => {
  const result = form.querySelector('.quiz-result');
  const fields = [...form.querySelectorAll('fieldset')];
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    let score = 0;
    fields.forEach((field) => {
      const selected = field.querySelector('input:checked');
      const correct = selected.value === field.dataset.answer;
      if (correct) score++;
      const feedback = field.querySelector('.quiz-feedback');
      const correctOption = field.querySelector(`input[value="${field.dataset.answer}"]`).closest('label');
      feedback.textContent = `${correct ? 'Respuesta correcta.' : 'Respuesta incorrecta. Respuesta correcta: ' + correctOption.textContent.trim()} ${feedback.dataset.explanation}`;
      feedback.hidden = false;
      field.classList.toggle('quiz-correct', correct);
      field.classList.toggle('quiz-incorrect', !correct);
      field.querySelectorAll('input').forEach((input) => { input.disabled = true; });
    });
    result.textContent = `Resultado: ${score} de ${fields.length} respuestas correctas (${Math.round(score / fields.length * 100)} %). ${score === fields.length ? 'Evaluación completada con todas las respuestas correctas.' : 'Se recomienda revisar las explicaciones y volver a intentarlo.'}`;
    form.querySelector('[type="submit"]').disabled = true;
    result.focus();
  });
  form.addEventListener('reset', () => {
    fields.forEach((field) => {
      field.classList.remove('quiz-correct', 'quiz-incorrect');
      const feedback = field.querySelector('.quiz-feedback');
      feedback.hidden = true;
      feedback.textContent = '';
      field.querySelectorAll('input').forEach((input) => { input.disabled = false; });
    });
    result.textContent = '';
    form.querySelector('[type="submit"]').disabled = false;
    form.querySelector('input').focus();
  });
});
