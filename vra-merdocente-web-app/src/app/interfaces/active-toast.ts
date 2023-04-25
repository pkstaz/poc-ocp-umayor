export interface ActiveToast {
	/** Your Toast ID. Use this to close it individually */
  toastId: number;
  /** the title of your toast. Stored to prevent duplicates if includeTitleDuplicates set */
  title: string;
  /** the message of your toast. Stored to prevent duplicates */
  message: string;
}
