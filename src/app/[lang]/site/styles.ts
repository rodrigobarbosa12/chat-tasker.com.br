export const styles = {
  appBar: {
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexGrow: 1,
  },
  logoIcon: {
    backgroundColor: '#00d4aa',
    color: '#0f172a',
    width: 32,
    height: 32,
  },
  loginButton: {
    backgroundColor: '#00d4aa',
    color: '#0f172a',
    '&:hover': {
      backgroundColor: '#00b894',
    },
  },
  mainContainer: {
    padding: '24px',
  },
  // sectionHeader: {
  //   display: "flex",
  //   alignItems: "center",
  //   gap: "8px",
  //   marginBottom: "16px",
  // },
  sectionIcon: {
    backgroundColor: '#00d4aa',
    color: '#0f172a',
    width: 24,
    height: 24,
  },
  chatContainer: {
    height: '680px',
    display: 'flex',
    flexDirection: 'column',
  },
  chatMessages: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  aiMessage: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  // userMessage: {
  //   display: "flex",
  //   alignItems: "flex-start",
  //   gap: "12px",
  //   justifyContent: "flex-end",
  // },
  messageContent: {
    maxWidth: '70%',
    padding: '12px 16px',
    borderRadius: '18px',
  },
  aiMessageContent: {
    backgroundColor: '#374151',
    color: '#f1f5f9',
  },
  userMessageContent: {
    backgroundColor: '#00d4aa',
    color: '#0f172a',
  },
  messageTime: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '4px',
  },
  // chatInput: {
  //   // padding: "16px",
  //   // borderTop: "1px solid #334155",
  // },
  // tasksContainer: {
  //   height: "720px",
  //   width: "100%",
  //   display: "flex",
  //   flexDirection: "column",
  //   padding: 2,
  // },
  tasksHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  filterSection: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    alignItems: 'center',
  },
  taskItem: {
    borderRadius: '8px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    marginBottom: 2,
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  taskTitle: {
    fontWeight: 600,
    color: '#f1f5f9',
  },
  taskDescription: {
    color: '#94a3b8',
    fontSize: '14px',
    marginBottom: '12px',
  },
  taskMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    color: '#64748b',
  },
  priorityChip: {
    fontSize: '12px',
    height: '24px',
  },
  highPriority: {
    backgroundColor: '#dc2626',
    color: '#fff',
  },
  mediumPriority: {
    backgroundColor: '#f59e0b',
    color: '#fff',
  },
  lowPriority: {
    backgroundColor: '#10b981',
    color: '#fff',
  },
  loginAlert: {
    marginBottom: '16px',
    backgroundColor: '#7f1d1d',
    color: '#fecaca',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
}
