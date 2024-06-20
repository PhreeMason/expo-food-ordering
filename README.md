## Setup local supabase

```cmd
    bunx supabase init
    bunx supabase link project-ref
    bunx supabase db pull
    bunx supabase db pull --schema auth,storage
    bunx supabase start

    ngrok http 54321
```
