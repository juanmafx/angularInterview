export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

// Add new interfaces here during interview
