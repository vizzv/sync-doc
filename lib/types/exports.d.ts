export type User = {
    id: string;
    name: string;
    avatar_url?: string | null;
    email: string;
    created_at: string; // ISO date string
  
    // Relations
    documentsOwned?: Document[];
    sharedLinksCreated?: SharedLink[];
    documentPermissions?: DocumentPermission[];
    permissionsGranted?: DocumentPermission[];
  }
  
  export type Document = {
    id: string;
    current_version_id?: string | null;
    title: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    owner_id: string;
  
    // Relations
    owner?: User;
    sharedLinks?: SharedLink[];
    permissions?: DocumentPermission[];
  }
  
  export type SharedLink = {
    id: string;
    url_token: string;
    created_at: string; // ISO date string
    expires_at?: string | null; // ISO date string or null
    is_active: boolean;
    document_id: string;
    created_by: string;
  
    // Relations
    document?: Document;
    creator?: User;
  }
  
  export type Permission = {
    id: string;
    name: string;
    description?: string | null;
  
    // Relations
    grantedPermissions?: DocumentPermission[];
  }
  
  export type DocumentPermission = {
    id: string;
    document_id: string;
    user_id: string;
    granted_at: string; // ISO date string
    granted_by: string;
    permission_id: string;
  
    // Relations
    document?: Document;
    user?: User;
    grantedBy?: User;
    permission?: Permission;
  }
  
  export type DocumentContent = {
    document_id: string;      // UUID from Postgres
    content_json: any;        // flexible JSON content
    version_number: number;
    created_at: Date;         // JS Date object
    created_by: string;       // UUID from Postgres
  }
  