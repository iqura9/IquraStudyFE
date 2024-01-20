import React from 'react'
import { getAllGroups } from 'api/group.api'
import GroupDisplay from 'components/GroupCard'

import styles from './styles.module.scss'

import { useQuery } from '@tanstack/react-query'

const MyGroupsPage = () => {
  const {data} = useQuery({
    queryKey: ["getMyGroups"],
    queryFn: () => getAllGroups(true),
    retry: false,
    refetchOnWindowFocus: false,
  })
  
  return (
    <div className={styles.Wrapper}>
      {data?.map(group => <GroupDisplay key={group.id} group={group} />)}
    </div>
  )
}

export default MyGroupsPage