import { useForm } from '../utilities/useForm';

const isValidCompletionTime = (completionTime) => {
  if (isNaN(completionTime)) {
    return false;
  } else if (completionTime < 0) {
    return false;
  } else {
    return true;
  }
};

const isValidImportance = (importance) => {
  if (isNaN(importance)) {
    return false;
  } else if (importance < 1 || importance > 5) {
    return false;
  } else {
    return true;
  }
};

const validateAssignmentData = (key, val) => {
  switch (key) {
    case 'course':
    case 'name': return /(\w\w)/.test(val) ? '' : 'must be at least two characters';
    case 'dueDate': return val ? '' : 'must be a valid date';
    case 'dueTime': return val ? '' : 'must be a valid time';
    case 'completionTime': return isValidCompletionTime(val) ? '' : 'must be a positive number';
    case 'importance': return isValidImportance(val) ? '' : 'must be between 1 (low importance) and 5 (high importance)';
    default: return '';
  }
};

// TODO: change submit
const submit = (values) => alert(JSON.stringify(values));

const AssignmentForm = () => {
  // const { state: assignment } = useLocation();
  const [ errors, handleSubmit ] = useForm(validateAssignmentData, submit);

  return (
    <form onSubmit={handleSubmit} noValidate className="{errors ? 'was-validated' : null} row g-3">
      {/* <input type="hidden" name="id" value={assignment.id} /> */}
      <div className="col-auto">
        <label htmlFor="course" className="form-label">Course</label>
        <input type="text" className="form-control" id="course" name="course" placeholder="Ex: Math" />
        <div className="invalid-feedback">{errors?.course}</div>
      </div>
      <div className="col-auto">
        <label htmlFor="name" className="form-label">Assignment name</label>
        <input type="text" className="form-control" id="name" name="name" placeholder="Ex: Problem set 1" />
        <div className="invalid-feedback">{errors?.name}</div>
      </div>
      <div className="col-auto">
        <label htmlFor="dueDate" className="form-label">Due date</label>
        <input type="date" className="form-control" id="dueDate" name="dueDate" />
        <div className="invalid-feedback">{errors?.dueDate}</div>
      </div>
      <div className="col-auto">
        <label htmlFor="dueTime" className="form-label">Due time</label>
        <input type="time" className="form-control" id="dueTime" name="dueTime" />
        <div className="invalid-feedback">{errors?.dueTime}</div>
      </div>
      <div className="col-auto">
        <label htmlFor="completionTime" className="form-label">Est. time to complete (hrs)</label>
        <input type="number" className="form-control" id="completionTime" name="completionTime" />
        <div className="invalid-feedback">{errors?.completionTime}</div>
      </div>
      <div className="col-auto">
        <label htmlFor="importance" className="form-label">Importance (1-5)</label>
        <input type="number" className="form-control" id="importance" name="importance" />
        <div className="invalid-feedback">{errors?.importance}</div>
      </div>
      <div className="col-auto align-self-end">
        {/* TODO: make button be on same line as iinput boxes */}
        <button type="submit" className="btn btn-primary">+</button>
      </div>
    </form>
  );
};

export default AssignmentForm;