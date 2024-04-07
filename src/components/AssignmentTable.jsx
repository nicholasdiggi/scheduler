import Assignment from './Assignment';

const AssignmentTable = ({ assignments }) => {
  return (
    <div className="assignment-table">
      {Object.values(assignments).map(assignment => (
        <Assignment key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
};

export default AssignmentTable;