import Assignment from './Assignment';
import { sortAssignments } from '../utilities/priority';

const AssignmentTable = ({ assignments }) => {
  // const sortedAssignmentArray = sortAssignments(assignments);
  return (
    <div className="assignment-table">
      {/* {sortedAssignmentArray.forEach(assignment => {
        <Assignment key={assignment.id} assignment={assignment} />
      })} */}
      {Object.values(assignments).map(assignment => (
        <Assignment key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
};

export default AssignmentTable;