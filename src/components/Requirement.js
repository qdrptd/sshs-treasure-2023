import React from "react";
import { List } from "semantic-ui-react";

// type RequirementProps = {
//   header?: string,
//   description?: string,
//   condition: boolean
// }

export const Requirement = (props) => {
  return (
    <List.Item>
      {props.condition
        ? <List.Icon name="check circle" size="large" color="green" verticalAlign="middle" />
        : <List.Icon name="exclamation circle" size="large" color="red" verticalAlign="middle" />
      }
      <List.Content>
        {props.header && <List.Header>{props.header}</List.Header>}
        {props.description && <List.Description>{props.description}</List.Description>}
      </List.Content>
    </List.Item>
  )
}