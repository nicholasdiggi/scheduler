import { useLocation } from 'react-router-dom';
import { useForm } from './useForm';
import { timeParts } from './utilities/times';
import { setData } from './utilities/firebase';

// Require meets to be either an empty string, for courses not yet scheduled,
// or a string that timeParts() can parse into day and time data
const isValidMeets = (meets) => {
  const parts = timeParts(meets);
  return (meets === '' || (parts.days && !isNaN(parts.hours?.start) && !isNaN(parts.hours?.end)));
};

// Validates the fields title and meets
// Returns a non-empty error message when a field fails to validate
const validateCourseData = (key, val) => {
  switch (key) {
    // A title must have at least two characters
    case 'title': return /(\w\w)/.test(val) ? '' : 'must be at least two characters';
    // Meets must be days hh:mm-hh:mm
    case 'meets': return isValidMeets(val) ? '' : 'must be days hh:mm-hh:mm';
    default: return '';
  }
};

// // Displays the form data that would be submitted
// const submit = (values) => alert(JSON.stringify(values));

const submit = async (values) => {
  if (window.confirm(`Change ${values.id} to ${values.title}: ${values.meets}?`)) {
    try {
      await setData(
        `courses/${values.id}/`,
        {
          term: values.term,
          number: values.number,
          meets: values.meets,
          title: values.title
        }
      );
    } catch (error) {
      alert(error);
    }
  }
};

const EditForm = () => {
  const { state: course } = useLocation();
  const [ errors, handleSubmit ] = useForm(validateCourseData, submit);
  return (
    <form onSubmit={handleSubmit} noValidate className={errors ? 'was-validated' : null}>
      <input type='hidden' name='id' value={course.id} />
      <input type='hidden' name='term' value={course.term} />
      <input type='hidden' name='number' value={course.number} />
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Course title</label>
        <input className="form-control" id="title" name="title" defaultValue={course.title} />
        <div className='invalid-feedback'>{errors?.title}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting time</label>
        <input className="form-control" id="meets" name="meets" defaultValue={course.meets} />
        <div className='invalid-feedback'>{errors?.meets}</div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default EditForm;