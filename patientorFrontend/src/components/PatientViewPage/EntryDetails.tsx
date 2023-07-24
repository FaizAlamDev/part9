import { ReactNode } from "react";
import { Entry } from "../../types";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const EntryDetails = ({
  entry,
  children,
}: {
  entry: Entry;
  children?: ReactNode;
}) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <>
          <div>{entry.date}</div>
          {children}
          <div>
            <p>
              discharged on {entry.discharge.date} on criteria "
              {entry.discharge.criteria}"{" "}
            </p>
          </div>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <div>
            {entry.date} {entry.employerName}
          </div>
          {children}
          <div>
            {entry.sickLeave?.startDate ? (
              <p>
                SickLeave from: {entry.sickLeave.startDate} until:{" "}
                {entry.sickLeave.endDate}{" "}
              </p>
            ) : (
              <p>No Sick Leaves</p>
            )}
          </div>
        </>
      );
    case "HealthCheck":
      return (
        <>
          <div>{entry.date}</div>
          <div>
            {entry.healthCheckRating === 0 ? (
              <FavoriteOutlinedIcon style={{ color: "green" }} />
            ) : entry.healthCheckRating === 1 ? (
              <FavoriteOutlinedIcon style={{ color: "yellow" }} />
            ) : (
              <FavoriteOutlinedIcon style={{ color: "red" }} />
            )}
          </div>
          {children}
        </>
      );
    default:
      return <></>;
  }
};

export default EntryDetails;
