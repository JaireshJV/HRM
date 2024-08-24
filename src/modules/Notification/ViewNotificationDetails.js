import React from 'react'
import { Col } from 'antd'
import { CustomRow } from '../../components/CustomRow'
import { StyledNotification } from './style'


export const ViewNotificationDetails = ({ dataSource }) => {
  console.log(dataSource, "dataSourcedataSourcedataSource");
  return (
    <StyledNotification>
    <CustomRow space={[12, 12]}>
      {dataSource.map((item, index) => (
        <Col span={24} md={24} key={index}>
          <h6>{item.birthday_message}</h6>
          <p>
            {item.first_name && item.last_name ? `${item.first_name} ${item.last_name}` : ''}
            {item.project_title ? ` ${item.project_title}` : ''}
            <span>{item.date ? `[${item.date}]` : ''}</span>
          </p>
        </Col>
      ))}
    </CustomRow>
    </StyledNotification>
  )
}
