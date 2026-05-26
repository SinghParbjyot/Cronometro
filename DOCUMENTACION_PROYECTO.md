# CronoLimits-App — Documentación Técnica v5.1

## 📋 Tabla de Contenidos

1. [Descripción General](#1-descripción-general)
2. [Stack Tecnológico](#2-stack-tecnológico)
3. [Estructura de Directorios](#3-estructura-de-directorios)
4. [Arquitectura de paquetes — Backend](#4-arquitectura-de-paquetes--backend)
5. [Módulo COMMON — Infraestructura transversal](#5-módulo-common--infraestructura-transversal)
6. [Módulo AUTH — Seguridad JWT y Email](#6-módulo-auth--seguridad-jwt-y-email)
7. [Módulo USERS — Usuarios](#7-módulo-users--usuarios)
8. [Módulo EVENTS — Eventos](#8-módulo-events--eventos)
9. [Módulo REGISTRATIONS — Inscripciones](#9-módulo-registrations--inscripciones)
10. [Módulo SHOP — Tienda](#10-módulo-shop--tienda)
11. [Módulo ADMIN — Dashboard y panel de administración](#11-módulo-admin--dashboard-y-panel-de-administración)
12. [Módulo CONTACT — Mensajes de contacto](#12-módulo-contact--mensajes-de-contacto)
13. [Capa de DTOs y Mappers](#13-capa-de-dtos-y-mappers)
14. [Reglas de negocio](#14-reglas-de-negocio)
15. [Sistema de logging](#15-sistema-de-logging)
16. [API REST — Referencia completa de endpoints](#16-api-rest--referencia-completa-de-endpoints)
17. [Modelo de Base de Datos](#17-modelo-de-base-de-datos)
18. [Flujo de Autenticación JWT](#18-flujo-de-autenticación-jwt)
19. [Configuración de Seguridad](#19-configuración-de-seguridad)
20. [Frontend Angular — Arquitectura](#20-frontend-angular--arquitectura)
21. [Frontend Angular — Módulo Core](#21-frontend-angular--módulo-core)
22. [Frontend Angular — Módulo Home](#22-frontend-angular--módulo-home)
23. [Frontend Angular — Módulo Contact](#23-frontend-angular--módulo-contact)
24. [Frontend Angular — Módulo Tienda (Shop)](#24-frontend-angular--módulo-tienda-shop)
25. [Frontend Angular — Módulo Admin](#25-frontend-angular--módulo-admin)
26. [Configuración y Arranque](#26-configuración-y-arranque)
27. [Variables de entorno y application.properties](#27-variables-de-entorno-y-applicationproperties)
28. [Ejemplos Postman por módulo](#28-ejemplos-postman-por-módulo)
29. [Decisiones de Diseño](#29-decisiones-de-diseño)
30. [Estado del Proyecto — v5.0 / Roadmap](#30-estado-del-proyecto--v50--roadmap)
31. [Sistema de Diseño UI — Design Tokens y CSS global](#31-sistema-de-diseño-ui--design-tokens-y-css-global)
32. [Reactividad del estado de autenticación](#32-reactividad-del-estado-de-autenticación)
33. [Historial de cambios — Changelog](#33-historial-de-cambios--changelog)
34. [Patrón AuthDialog — Flujo de autenticación requerida](#34-patrón-authdialog--flujo-de-autenticación-requerida)
35. [Frontend Angular — RegistrationWizardComponent](#35-frontend-angular--registrationwizardcomponent)
36. [Frontend Angular — AdminEventDetailComponent](#36-frontend-angular--admineventdetailcomponent)
37. [Frontend Angular — ProfileComponent (perfil avanzado)](#37-frontend-angular--profilecomponent-perfil-avanzado)
38. [Módulo CONFIG — Inicialización y recursos estáticos](#38-módulo-config--inicialización-y-recursos-estáticos)
39. [Sistema de Verificación de Email](#39-sistema-de-verificación-de-email)
40. [Módulo SHOP — Reseñas de productos (Reviews)](#40-módulo-shop--reseñas-de-productos-reviews)
41. [Frontend Angular — Servicios nuevos v4.0](#41-frontend-angular--servicios-nuevos-v40)
42. [Frontend Angular — VerifyEmailComponent](#42-frontend-angular--verifyemailcomponent)
43. [Frontend Angular — Módulo Legal (Cookies, Privacidad, Términos)](#43-frontend-angular--módulo-legal-cookies-privacidad-términos)

---

## 1. Descripción General

**CronoLimits-App** es una plataforma fullstack orientada a la gestión de eventos deportivos de resistencia
(trail running, ciclismo, triatlón, etc.). La versión 1.0 está **completamente implementada** en
backend y frontend.

Los **usuarios** pueden:
- Registrarse y autenticarse con JWT.
- Consultar y apuntarse a eventos deportivos publicados.
- Comprar productos en la tienda integrada (carrito, checkout, historial de pedidos).
- Gestionar su perfil y ver sus inscripciones y pedidos.

Los **administradores** disponen adicionalmente de:
- CRUD completo de usuarios, eventos y productos.
- Lectura de todos los pedidos del sistema.
- Dashboard con métricas agregadas en tiempo real.
- Lista paginada de mensajes de contacto.

---

## 2. Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Backend framework | Spring Boot | 4.0.3 |
| Lenguaje backend | Java | 17 |
| Seguridad | Spring Security + JJWT | 0.13.0 |
| Persistencia | Spring Data JPA / Hibernate | (BOM SB 4) |
| Base de datos | PostgreSQL | 15+ |
| Serialización JSON | Jackson 3 (`tools.jackson`) | (BOM SB 4) |
| Build backend | Maven (mvnw) | 3.9+ |
| Frontend framework | Angular | 21.2 |
| Lenguaje frontend | TypeScript | 5.9 |
| HTTP cliente | Angular HttpClient + Interceptor | — |
| Routing frontend | Angular Router con guards | — |
| Estado carrito | RxJS BehaviorSubject (singleton) | — |
| Alertas UI | SweetAlert2 | 11.26+ |
| Testing frontend | Vitest | 4.0+ |
| Formatter | Prettier | 3.8+ |

### Dependencias Maven destacadas (`pom.xml`)

```xml
spring-boot-starter-data-jpa
spring-boot-starter-webmvc
spring-boot-starter-security
spring-boot-starter-validation
postgresql (runtime)
jjwt-api        0.13.0
jjwt-impl       0.13.0 (runtime)
jjwt-jackson    0.13.0 (runtime)
spring-boot-devtools (runtime, optional)
```

### Dependencias npm destacadas (`package.json`)

```json
// dependencies
"@angular/common":    "^21.2.0"
"@angular/forms":     "^21.2.0"
"@angular/router":    "^21.2.0"
"rxjs":               "~7.8.0"
"sweetalert2":        "^11.26.22"   // alertas UI con SweetAlert2

// devDependencies
"@angular/cli":       "^21.2.1"
"typescript":         "~5.9.2"
"vitest":             "^4.0.8"      // framework de tests frontend
"prettier":           "^3.8.1"      // formatter de código
"jsdom":              "^28.0.0"
```

---

## 3. Estructura de Directorios

```
CronoLimits-App/
├── DOCUMENTACION_PROYECTO.md
│
├── cronolimits-backend/                    # Backend Spring Boot
│   ├── pom.xml
│   ├── mvnw / mvnw.cmd
│   └── src/main/
│       ├── resources/
│       │   └── application.properties
│       └── java/com/springboot/backend/singh/usersapp/cronolimits/
│           ├── CronolimitsBackendApplication.java
│           ├── common/
│           │   ├── dto/           ApiError.java
│           │   ├── error/         GlobalExceptionHandler.java
│           │   └── exceptions/    ResourceNotFoundException.java
│           │                      UserAlreadyExistsException.java
│           │                      RegistrationNotAllowedException.java
│           │                      EventStatusChangeNotAllowedException.java
│           │                      InsufficientStockException.java
│           ├── config/
│           │   ├── DataInitializer.java          @ApplicationRunner — crea admin por defecto
│           │   └── WebConfig.java                @Configuration — sirve /uploads/** desde disco
│           ├── auth/
│           │   ├── AuthController.java           POST /register, GET /verify, POST /resend-verification
│           │   ├── JwtAuthenticationFilter.java
│           │   ├── JwtValidationFilter.java
│           │   ├── SimpleGrantedAuthorityJsonCreator.java
│           │   ├── SpringSecurityConfig.java
│           │   ├── TokenJwtConfig.java
│           │   ├── entities/
│           │   │   └── PendingRegistration.java  tabla pending_registrations
│           │   ├── repositories/
│           │   │   └── PendingRegistrationRepository.java
│           │   └── services/
│           │       ├── EmailService.java         envío de emails transaccionales
│           │       ├── EmailServiceImpl.java     Gmail SMTP / Spring Mail
│           │       ├── EmailVerificationService.java      flujo de verificación
│           │       └── EmailVerificationServiceImpl.java
│           ├── users/
│           │   ├── controllers/   UserController.java, ProfileController.java
│           │   ├── entities/      User.java, Role.java
│           │   ├── mappers/       UserMapper.java
│           │   ├── models/        IUser.java, UserRequest.java, RegisterRequest.java
│           │   │                  UserResponse.java, ProfileUpdateRequest.java
│           │   ├── repositories/  UserRepository.java, RoleRepository.java
│           │   └── services/      UserService.java, UserServiceImpl.java
│           │                      JpaUserDetailsService.java
│           ├── events/
│           │   ├── controllers/   EventController.java
│           │   ├── entities/      Event.java, EventStatus.java
│           │   ├── mappers/       EventMapper.java
│           │   ├── models/        EventDTO.java, EventRequest.java
│           │   ├── repositories/  EventRepository.java
│           │   └── services/      EventService.java, EventServiceImpl.java
│           ├── registrations/
│           │   ├── controllers/   RegistrationController.java
│           │   ├── entities/      Registration.java
│           │   ├── mappers/       RegistrationMapper.java
│           │   ├── models/        RegistrationDTO.java
│           │   ├── repositories/  RegistrationRepository.java
│           │   └── services/      RegistrationService.java, RegistrationServiceImpl.java
│           ├── shop/
│           │   ├── controllers/   ProductController.java, OrderController.java
│           │   │                  ReviewController.java
│           │   ├── entities/      Product.java, ShopOrder.java, OrderItem.java
│           │   │                  Review.java
│           │   ├── mappers/       ProductMapper.java, OrderMapper.java, ReviewMapper.java
│           │   ├── models/        ProductDTO.java, ProductRequest.java
│           │   │                  OrderDTO.java, OrderItemDTO.java, OrderItemRequest.java
│           │   │                  ReviewDTO.java, ReviewRequest.java, ReviewStatsProjection.java
│           │   ├── repositories/  ProductRepository.java, OrderRepository.java
│           │   │                  ReviewRepository.java
│           │   └── services/      ProductService.java, ProductServiceImpl.java
│           │                      OrderService.java, OrderServiceImpl.java
│           │                      ReviewService.java, ReviewServiceImpl.java
│           ├── admin/
│           │   ├── controllers/   AdminDashboardController.java
│           │   ├── dto/           AdminDashboardDTO.java
│           │   └── services/      AdminDashboardService.java, AdminDashboardServiceImpl.java
│           ├── contact/
│           │   ├── controllers/   ContactController.java
│           │   ├── entities/      ContactMessage.java
│           │   ├── mappers/       ContactMessageMapper.java
│           │   ├── models/        ContactMessageDTO.java
│           │   ├── repositories/  ContactMessageRepository.java
│           │   └── services/      ContactMessageService.java, ContactMessageServiceImpl.java
│           ├── forms/
           │   ├── controllers/   FormQuestionController.java
           │   ├── entities/      FormQuestion.java (event nullable), FormQuestionOption.java
           │   ├── mappers/       FormQuestionMapper.java
           │   ├── models/        FormQuestionDTO.java, FormQuestionRequest.java
           │   ├── repositories/  FormQuestionRepository.java
           │   └── services/      FormQuestionService.java, FormQuestionServiceImpl.java
           ├── templates/                                                     ← NUEVO v5.0
           │   ├── controllers/   FormTemplateController.java
           │   ├── entities/      FormTemplate.java, FormTemplateQuestion.java
           │   ├── models/        FormTemplateDTO.java, FormTemplateQuestionDTO.java
           │   │                  FormTemplateRequest.java
           │   ├── repositories/  FormTemplateRepository.java
           │   └── services/      FormTemplateService.java, FormTemplateServiceImpl.java
           └── results/              (Estructura inicializada — pendiente de implementación)
│
└── cronolimits-frontend/               # Frontend Angular 21
    ├── angular.json
    ├── package.json
    ├── tsconfig.json / tsconfig.app.json
    └── src/
        ├── index.html
        ├── main.ts
        ├── styles.css
        └── app/
            ├── app.config.ts           Providers: Router, HttpClient + authInterceptor
            ├── app.routes.ts           Rutas completas de la SPA
            ├── components/
            │   ├── app.html / app.ts   Root component (<router-outlet>)
            │   └── navbar/             Navbar legacy (usada en páginas no-admin)
            │       ├── navbar.ts       Incluye CartService para badge del carrito
            │       └── navbar.html
            ├── core/
            │   ├── constants/
            │   │   └── geo.constants.ts     SPAIN_PROVINCES, COUNTRIES, PHONE_PREFIXES
            │   ├── guards/
            │   │   ├── auth.guard.ts   authGuard — redirige a /login
            │   │   └── admin.guard.ts  adminGuard — redirige a /login si no es admin
            │   ├── interceptors/
            │   │   └── auth.interceptor.ts  Añade Bearer token a todas las peticiones
            │   ├── models/
            │   │   ├── auth.model.ts   LoginResponse, RegisterRequest, UserResponse, ApiError
            │   │   ├── event.ts        EventDTO, PagedResponse<T>
            │   │   ├── registration.ts RegistrationDTO
            │   │   ├── user.model.ts   User (clase para formularios admin)
            │   │   ├── product.ts      ProductDTO, CartItem
            │   │   ├── order.ts        OrderItemRequest, OrderItemDTO, OrderDTO
            │   │   ├── review.ts       ReviewDTO, ReviewRequest, ReviewPage, ReviewSortOption  ← NUEVO v4.0
            │   │   ├── participant.ts  ParticipantDTO (resultados)
            │   │   └── admin.model.ts  AdminDashboardDTO, ContactMessageDTO, EventRequest
            │   │                       ProductRequest, AdminOrderDTO, AdminOrderItemDTO
            │   └── services/
            │       ├── auth.service.ts          login, register, logout, isAdmin, token
            │       │                             verifyEmail(), resendVerification()
            │       ├── user.service.ts           CRUD usuarios (paginado)
            │       ├── event.service.ts          getEvents, getEventById + métodos admin
            │       ├── registration.service.ts   register, cancel, getMyRegistrations
            │       ├── profile.service.ts        getProfile, updateProfile
            │       ├── sharing-data.service.ts   EventEmitter compartido (admin shell)
            │       ├── product.service.ts        getProducts, getProductById + métodos admin
            │       ├── order.service.ts          createOrder, getMyOrders
            │       ├── cart.service.ts           BehaviorSubject carrito (singleton)
            │       ├── contact.service.ts        sendContactMessage (POST /api/contact)
            │       ├── auth-dialog.service.ts    requireAuth() con diálogo SweetAlert2
            │       ├── review.service.ts         getReviews(), submitReview()
            │       ├── toast.service.ts          Notificaciones toast no bloqueantes
            │       ├── event-reminder.service.ts Alertas de eventos en 24 h
            │       ├── form-builder.service.ts   CRUD form-questions, banco y plantillas  ← NUEVO v5.0
            │       └── admin.service.ts          getDashboard, getAllOrders, getContactMessages,
            │                                        getEventRegistrations, getEvent, downloadCSV
            ├── features/
            │   ├── auth/
            │   │   ├── login/          LoginComponent
            │   │   ├── register/       RegisterComponent
            │   │   └── verify-email/   VerifyEmailComponent  ← NUEVO v4.0
            │   ├── home/               HomeComponent
            │   ├── contact/            ContactComponent
            │   ├── profile/            ProfileComponent
            │   ├── events/
            │   │   ├── list/           EventsListComponent
            │   │   └── detail/         EventDetailComponent
            │   ├── registrations/
            │   │   ├── event-registration/ EventRegistrationComponent (flujo simplificado)
            │   │   ├── registration-wizard/  RegistrationWizardComponent  ← NUEVO (4 pasos)
            │   │   └── my-registrations/     MyRegistrationsComponent
            │   ├── shop/
            │   │   ├── product-list/   ProductListComponent    /shop
            │   │   ├── product-detail/ ProductDetailComponent  /shop/products/:id
            │   │   ├── cart/           CartComponent           /cart
            │   │   ├── checkout/       CheckoutComponent       /checkout (auth)
            │   │   └── my-orders/      MyOrdersComponent       /my-orders (auth)
            │   ├── legal/                                                    ← NUEVO v4.1
            │   │   ├── cookies-policy/   CookiesPolicyComponent  /cookies
            │   │   ├── privacy-policy/   PrivacyPolicyComponent   /privacy
            │   │   └── terms-of-use/     TermsOfUseComponent      /terms
            │   └── admin/
            │       ├── users/
            │       │   ├── admin-shell.component           Shell con router-outlet
            │       │   ├── admin-users-list.component      Listado paginado
            │       │   └── admin-user-form.component       Crear / editar usuario
            │       ├── dashboard/
            │       │   └── admin-dashboard.component       /admin
            │       ├── events/
            │       │   ├── admin-events.component             /admin/events
            │       │   ├── admin-event-detail.component       /admin/events/:id
            │       │   ├── layout/
            │       │   │   ├── admin-event-layout.component   shell con sidebar
            │       │   │   └── admin-event-sidebar.component  nav lateral del evento
            │       │   ├── settings/
            │       │   │   └── admin-event-basic-settings.component
            │       │   └── placeholders/
            │       │       └── admin-event-section-placeholder.component
            │       ├── form-builder/
            │       │   └── admin-form-builder.component       /admin/events/:id/form-builder  ← NUEVO v5.0
            │       ├── participants/
            │       │   └── admin-participants.component       /admin/events/:id/participants
            │       ├── question-bank/
            │       │   └── question-bank.component            /admin/question-bank  ← NUEVO v5.0
            │       ├── products/
            │       │   └── admin-products.component           /admin/products
            │       ├── orders/
            │       │   └── admin-orders.component             /admin/orders
            │       ├── registrations/
            │       │   └── admin-registrations.component      /admin/registrations
            │       └── contact-messages/
            │           └── admin-contact-messages.component   /admin/contact-messages
            ├── shared/
            │   └── components/
            │       ├── navbar/         NavbarComponent (usado en AdminShell)
            │       ├── footer/         FooterComponent (enlaces legales con routerLink)
            │       ├── paginator/      PaginatorComponent (reutilizable)
            │       └── alerts/         (reutilizable)
            └── environments/
                ├── environment.ts                desarrollo (localhost)
                └── environment.production.ts     producción (.gitignore, generado por CI/CD)
```

---

## 4. Arquitectura de paquetes — Backend

El backend sigue una arquitectura **Modular por Dominio**: cada dominio de negocio es un paquete
raíz independiente con su propia capa de entidades, repositorios, servicios, controladores,
DTOs y mappers. No existen dependencias circulares entre módulos.

```
cronolimits/
  common/        →  Infraestructura transversal: excepciones, error handler, ApiError
  auth/          →  Seguridad, JWT, filtros, verificación de email
  users/         →  Gestión de usuarios y perfiles
  events/        →  Gestión de eventos deportivos
  registrations/ →  Inscripciones a eventos
  shop/          →  Catálogo de productos, pedidos y reseñas
  admin/         →  Dashboard de métricas y endpoints CRUD admin
  contact/       →  Formulario de contacto / feedback
  config/        →  Inicialización de datos y configuración de recursos estáticos  ← NUEVO v4.0
  results/       →  Estructura inicializada (paquetes creados) — implementación pendiente
```

Paquete raíz completo:
`com.springboot.backend.singh.usersapp.cronolimits`

### Convención de capas por módulo

```
{modulo}/entities/     Entidades JPA (@Entity)
{modulo}/repositories/ Repositorios Spring Data (JpaRepository)
{modulo}/services/     Interfaz + Impl con lógica de negocio (@Service, @Transactional)
{modulo}/controllers/  Controladores REST (@RestController)
{modulo}/models/       DTOs de entrada (XxxRequest) y salida (XxxDTO)
{modulo}/mappers/      Mappers estáticos Entidad <-> DTO
```

> **Regla fundamental**: los controladores **nunca** exponen entidades JPA directamente.
> Toda respuesta HTTP usa DTOs; toda entrada de admin usa un Request DTO validado con `@Valid`.

---

## 5. Módulo COMMON — Infraestructura transversal

### `ApiError` — cuerpo de error uniforme

Todos los errores del sistema devuelven este DTO:

```json
{
  "status":  422,
  "error":   "Unprocessable Entity",
  "message": "El aforo del evento está completo (200 plazas)",
  "path":    "/api/events/3/registrations"
}
```

```java
public record ApiError(int status, String error, String message, String path) {}
```

### Jerarquía de excepciones de dominio

| Excepción | HTTP | Cuándo se lanza |
|-----------|------|-----------------|
| `ResourceNotFoundException` | 404 | Entidad no encontrada por id o criterio |
| `UserAlreadyExistsException` | 409 | Username o email ya registrado |
| `EventStatusChangeNotAllowedException` | 422 | Transición de estado de evento no permitida |
| `RegistrationNotAllowedException` | 422 | Regla de negocio de inscripción violada |
| `InsufficientStockException` | 422 | Stock insuficiente, carrito vacío, producto inactivo |

### `GlobalExceptionHandler` — `@RestControllerAdvice`

Punto único de traducción de excepciones a `ApiError`.

| Prioridad | Excepción capturada | HTTP |
|-----------|---------------------|------|
| 1 | `MethodArgumentNotValidException` | 400 — errores `@Valid` en DTO |
| 2 | `ConstraintViolationException` | 400 — errores `@Validated` en path/query |
| 2.5 | `MethodArgumentTypeMismatchException` | 400 — tipo incorrecto en `@RequestParam` (ej. fecha con formato inválido) ← NUEVO v4.1 |
| 3 | `ResourceNotFoundException` | 404 |
| 4 | `UserAlreadyExistsException` | 409 |
| 5 | `DuplicateReviewException` | 409 — reseña duplicada ← NUEVO v4.0 |
| 6 | `EventStatusChangeNotAllowedException` | 422 |
| 7 | `RegistrationNotAllowedException` | 422 |
| 8 | `InsufficientStockException` | 422 |
| 9 | `DataIntegrityViolationException` | 409 — constraints únicos de BD |
| 10 | `AccessDeniedException` | 403 |
| 11 | `Exception` (fallback) | 500 — mensaje genérico, stack en log |

Los controladores **no contienen** `try/catch` ni `BindingResult`.

---

## 6. Módulo AUTH — Seguridad JWT y Email

### Archivos

| Clase | Rol |
|-------|-----|
| `TokenJwtConfig` | Constantes globales JWT: clave fija base64, prefijo `"Bearer "` |
| `JwtAuthenticationFilter` | Extiende `UsernamePasswordAuthenticationFilter`; gestiona `POST /login` |
| `JwtValidationFilter` | Extiende `BasicAuthenticationFilter`; valida el JWT en cada petición |
| `SimpleGrantedAuthorityJsonCreator` | `@JsonCreator` para deserializar roles desde el JWT |
| `SpringSecurityConfig` | `@Configuration @EnableMethodSecurity` — cadena de filtros, CORS, reglas de acceso |
| `AuthController` | `POST /api/auth/register`, `GET /api/auth/verify`, `POST /api/auth/resend-verification` |
| `PendingRegistration` | Entidad `@Entity` — tabla `pending_registrations` para registro en 2 pasos |
| `PendingRegistrationRepository` | Spring Data JPA sobre `pending_registrations` |
| `EmailService` | Interfaz: envío de emails (verificación, cancelación de evento, cancelación de pedido) |
| `EmailServiceImpl` | Implementación con Gmail SMTP / Spring Mail |
| `EmailVerificationService` | Interfaz: flujo de registro en 2 pasos |
| `EmailVerificationServiceImpl` | Implementación del flujo de registro pendiente + confirmación |

### Flujo de login (JwtAuthenticationFilter)

1. `POST /login` con body `{"username":"…","password":"…"}`.
2. Spring Security delega en `JpaUserDetailsService` → consulta BD → BCrypt.
3. Si OK: genera JWT firmado con `SECRET_KEY`, inyecta `username`, `authorities` e `isAdmin` en el payload.
4. Devuelve `Authorization: Bearer <token>` en la cabecera de respuesta.

### Flujo de validación (JwtValidationFilter)

1. Cada petición entrante extrae el header `Authorization`.
2. Verifica firma HMAC y expiración con `Jwts.parser()`.
3. Deserializa los roles con `SimpleGrantedAuthorityJsonCreator`.
4. Carga `SecurityContext` — el resto de la cadena ya trata al usuario como autenticado.

### Payload del JWT

```json
{
  "sub": "usuario1",
  "authorities": [{"authority":"ROLE_USER"}],
  "isAdmin": false,
  "iat": 1713000000,
  "exp": 1713086400
}
```

### Flujo de registro en dos pasos (v4.0)

> **Antes de v4.0**: `POST /api/auth/register` creaba el usuario directamente (201).  
> **Desde v4.0**: el registro es en dos pasos — el usuario no existe en `users` hasta que confirma su email.

```
1. POST /api/auth/register
   → Valida formulario (@Valid)
   → BCrypt password
   → EmailVerificationService.registerPending():
       • Comprueba unicidad en users + pending_registrations
       • Crea fila en pending_registrations (token UUID, expira en 24 h)
       • EmailService.sendVerificationEmail() → Gmail SMTP
   → 202 Accepted: { "message": "Hemos enviado un enlace de confirmación a ..." }

2. GET /api/auth/verify?token=xxxxx
   → EmailVerificationService.verifyAndCreateUser(token):
       • Consulta pending_registrations por token
       • Comprueba expiración (24 h)
       • Crea el User real en users con enabled=true + ROLE_USER
       • Elimina la fila de pending_registrations
   → 200 OK: { "message": "Tu cuenta ha sido activada..." }
   → 409 Conflict: token expirado (frontend muestra formulario de reenvío)
   → 400 Bad Request: token inválido

3. POST /api/auth/resend-verification
   Body: { "email": "usuario@ejemplo.com" }
   → EmailVerificationService.resendVerification(email):
       • Localiza pending_registration por email
       • Rate-limiting: mínimo 5 min entre reenvíos
       • Regenera token UUID + actualiza expiry
       • Reenvía email
   → 200 OK (o mensaje neutro por seguridad si no existe el email)
   → 409 Conflict: rate limit activo (mensaje de espera)
```

### Entidad `PendingRegistration`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | `Long` | PK |
| `token` | `String(36)` | UUID único — índice de búsqueda |
| `name`, `lastname` | `String(50)` | Datos del formulario |
| `email` | `String(255)` | `UNIQUE` — un pendiente por email |
| `username` | `String(20)` | `UNIQUE` — comprobado también vs `users` |
| `passwordHash` | `String` | BCrypt — nunca texto plano |
| `province`, `country`, `phone` | `String` | Opcionales |
| `createdAt` | `LocalDateTime` | Momento del registro |
| `expiresAt` | `LocalDateTime` | `createdAt + 24 h` |
| `lastSentAt` | `LocalDateTime` | Último reenvío — para rate-limiting |

### Emails transaccionales (`EmailService`)

| Método | Cuándo se invoca |
|--------|------------------|
| `sendVerificationEmail(name, email, token)` | Al crear un `PendingRegistration` nuevo o al reenviar |
| `sendEventCancellationEmail(...)` | Cuando un admin cancela un evento (notifica a los inscritos) |
| `sendOrderCancellationEmail(...)` | Cuando un admin cancela un pedido (notifica al comprador) |

La implementación (`EmailServiceImpl`) usa Spring Mail con Gmail SMTP (puerto 587 + STARTTLS).  
Las credenciales se inyectan desde variables de entorno `GMAIL_ADDRESS` / `GMAIL_APP_PASSWORD`.

### Endpoints de registro

```
POST /api/auth/register
Body: { "name", "lastname", "username", "email", "password", "province", "country",
        "phonePrefix", "phoneNumber", "acceptedPrivacyPolicy" }
→ 202 Accepted: { "message": "Hemos enviado un enlace..." }
→ 409 si email o username ya existe

GET /api/auth/verify?token=<uuid>
→ 200 OK: cuenta activada
→ 409 Conflict: token expirado
→ 400 Bad Request: token inválido

POST /api/auth/resend-verification
Body: { "email": "usuario@ejemplo.com" }
→ 200 OK: email enviado
→ 409 Conflict: rate limit (< 5 min desde último envío)
```

---

## 7. Módulo USERS — Usuarios

### Entidades

#### `User`

| Campo | Tipo | Restricciones |
|-------|------|--------------|
| `id` | `Long` | PK, auto |
| `name` | `String` | `@NotBlank` |
| `lastname` | `String` | `@NotBlank` |
| `email` | `String` | `@Email`, `@NotEmpty` |
| `username` | `String` | `@NotBlank`, `@Size(4,12)` |
| `password` | `String` | `@NotBlank`, `@JsonProperty(WRITE_ONLY)` |
| `province` | `String` | opcional — provincia o región |
| `country` | `String` | opcional — país |
| `phone` | `String` | opcional — incluye prefijo internacional (ej. `+34612345678`) |
| `avatarUrl` | `String` | opcional — ruta relativa en servidor (`/uploads/avatars/{id}.ext`) |
| `enabled` | `boolean` | `true` por defecto; `false` = cuenta desactivada/baneada (RGPD) |
| `privacyAcceptedAt` | `LocalDateTime` | nullable — fecha en que el usuario aceptó la política de privacidad |
| `admin` | `boolean` | `@Transient`, calculado desde roles |
| `roles` | `List<Role>` | `@ManyToMany`, tabla `user_roles` |

#### `Role`

| Campo | Tipo | Valores |
|-------|------|---------|
| `id` | `Long` | PK |
| `name` | `String` | `ROLE_USER`, `ROLE_ADMIN` |

### Controladores

**`UserController`** `/api/users` — `@PreAuthorize("hasRole('ADMIN')")`

| Method | URL | Descripción |
|--------|-----|-------------|
| `GET` | `/api/users` | Lista todos los usuarios |
| `GET` | `/api/users/page/{page}` | Lista paginada (3 por página) |
| `GET` | `/api/users/{id}` | Detalle de usuario |
| `POST` | `/api/users` | Crear usuario |
| `PUT` | `/api/users/{id}` | Actualizar usuario |
| `DELETE` | `/api/users/{id}` | Borrar usuario |

**`ProfileController`** `/api/users/me` — cualquier usuario autenticado

| Method | URL | Descripción |
|--------|-----|-------------|
| `GET` | `/api/users/me` | Perfil del usuario autenticado |
| `PUT` | `/api/users/me` | Actualizar nombre, apellido, email, provincia, país y teléfono |
| `POST` | `/api/users/me/avatar` | Subir foto de perfil (multipart/form-data, campo `file`, max 5 MB) |
| `DELETE` | `/api/users/me` | RGPD HU-11: anonimiza y desactiva la cuenta (borrado lógico) |
| `GET` | `/api/users/me/registrations` | Mis inscripciones activas |
| `GET` | `/api/users/me/orders` | Mis pedidos |

### DTOs y Mapper

| Clase | Tipo | Uso |
|-------|------|-----|
| `UserResponse` | DTO salida | id, name, lastname, username, email, province?, country?, phone?, avatarUrl?, roles — *sin password* |
| `UserRequest` | DTO entrada admin | Todos los campos para create/update |
| `RegisterRequest` | DTO entrada pública | name, lastname, username, email, password, province, country, phonePrefix+phoneNumber, acceptedPrivacyPolicy |
| `ProfileUpdateRequest` | DTO entrada perfil | name (`@Pattern`), lastname (`@Pattern`), email, province?, country?, phone? (`@Pattern` E.164) |
| `UserMapper` | Mapper estático | `toDTO(User)`, `toDTOList(List<User>)` |

---

## 8. Módulo EVENTS — Eventos

### Entidad `Event`

| Campo | Tipo | Restricciones |
|-------|------|--------------|
| `id` | `Long` | PK |
| `name` | `String` | `@NotBlank` |
| `description` | `String` | opcional, TEXT |
| `date` | `LocalDateTime` | `@Future` |
| `location` | `String` | `@NotBlank` |
| `sportType` | `String` | ej. `"TRAIL"`, `"CICLISMO"` |
| `maxCapacity` | `Integer` | `@Min(1)` |
| `price` | `BigDecimal` | `@DecimalMin("0.00")` |
| `status` | `EventStatus` | enum: `DRAFT`, `PUBLISHED`, `CANCELLED` |
| `createdAt` | `LocalDateTime` | `@PrePersist` |
| `updatedAt` | `LocalDateTime` | `@PreUpdate` |
| `isFree()` | `boolean` | `@Transient` — `price == 0` |

#### `EventStatus` (enum)

```java
DRAFT       // borrador — no visible públicamente, no acepta inscripciones
PUBLISHED   // visible y abierto a inscripciones
CANCELLED   // baja lógica — inmutable; no se borra físicamente
```

### Controlador (`EventController`)

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `GET` | `/api/events` | 🌐 | Paginado con filtros opcionales |
| `GET` | `/api/events/{id}` | 🌐 | Solo si `status = PUBLISHED` |
| `POST` | `/api/admin/events` | 🛡️ ADMIN | Crear evento |
| `PUT` | `/api/admin/events/{id}` | 🛡️ ADMIN | Actualizar evento |
| `DELETE` | `/api/admin/events/{id}` | 🛡️ ADMIN | Baja lógica → CANCELLED (204) |

Query params de `GET /api/events`: `page`, `size`, `sportType`, `location`, `fromDate`, `toDate`

> **v4.1 — Fix filtro de fechas**: `fromDate` y `toDate` son `LocalDate` con `@DateTimeFormat(iso = ISO.DATE)`.
> Formato esperado: `yyyy-MM-dd` (compatible con `<input type="date">`).
> Internamente se convierten a `LocalDateTime` (`atStartOfDay()` / `atTime(23,59,59)`).
> Antes eran `LocalDateTime` con `ISO.DATE_TIME`, lo que causaba un error 500 al enviar solo una fecha sin hora.

### DTOs y Mapper

| Clase | Uso |
|-------|-----|
| `EventDTO` | id, name, description, date, location, sportType, maxCapacity, price, isFree, status |
| `EventRequest` | Campos con validaciones `@Future`, `@Min`, `@NotBlank` |
| `EventMapper` | `toDTO(Event)`, `toEntity(EventRequest)`, `updateEntity(EventRequest, Event)` |

---

## 9. Módulo REGISTRATIONS — Inscripciones

### Entidad `Registration`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | `Long` | PK |
| `user` | `User` | `@ManyToOne(LAZY)` |
| `event` | `Event` | `@ManyToOne(LAZY)` |
| `registrationDate` | `LocalDateTime` | `@PrePersist` |
| `paymentStatus` | `String` | `"PAID"` (simulado) |
| `bibNumber` | `Integer` | nullable, dorsal |
| `cancelled` | `Boolean` | baja lógica |
| `cancelledAt` | `LocalDateTime` | nullable |

Restricción de BD: `@UniqueConstraint(columnNames = {"user_id","event_id"})`

### Controlador (`RegistrationController`)

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `POST` | `/api/events/{eventId}/registrations` | 🔒 | Inscribirse |
| `DELETE` | `/api/registrations/{id}` | 🔒 | Cancelar inscripción (regla 48h) |

### Reglas de negocio — `registerUserToEvent`

1. Evento `CANCELLED` → 422
2. Evento `DRAFT` (no PUBLISHED) → 422
3. Fecha pasada → 422
4. Aforo completo → 422
5. Ya inscrito → 422

### Reglas de negocio — `cancelRegistration`

1. Sin autorización → 422
2. Ya cancelada → 422
3. Menos de 48h para el evento → 422 (incluye horas restantes)

---

## 10. Módulo SHOP — Tienda

### Entidad `Product`

| Campo | Tipo | Restricciones |
|-------|------|--------------|
| `id` | `Long` | PK |
| `name` | `String` | `@NotBlank` |
| `description` | `String` | TEXT, opcional |
| `price` | `BigDecimal` | `@DecimalMin("0.01")` |
| `stock` | `Integer` | `@Min(0)` |
| `category` | `String` | ej. `"CAMISETAS"`, `"CALZADO"` |
| `imageUrl` | `String` | opcional |
| `active` | `Boolean` | baja lógica; default `true` |
| `createdAt` | `LocalDateTime` | `@PrePersist` |
| `updatedAt` | `LocalDateTime` | `@PreUpdate` |

### Entidad `ShopOrder`

> Nombre `ShopOrder` (tabla `shop_orders`) — `ORDER` es palabra reservada SQL.

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | `Long` | PK |
| `user` | `User` | `@ManyToOne(LAZY)` |
| `createdAt` | `LocalDateTime` | `@PrePersist` |
| `totalAmount` | `BigDecimal` | calculado en el servicio antes de persistir |
| `status` | `String` | `PENDING`, `PAID`, `SHIPPED`, `DELIVERED`, `CANCELLED` |
| `items` | `List<OrderItem>` | `@OneToMany(cascade=ALL, orphanRemoval=true)` |

### Entidad `OrderItem`

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | `Long` | PK |
| `order` | `ShopOrder` | `@ManyToOne(LAZY)` |
| `product` | `Product` | `@ManyToOne(LAZY)` |
| `quantity` | `Integer` | `@Min(1)` |
| `unitPrice` | `BigDecimal` | snapshot del precio al comprar |
| `getLineTotal()` | `BigDecimal` | `@Transient` — `unitPrice × quantity` |

### Controladores

**`ProductController`**

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `GET` | `/api/products` | 🌐 | Catálogo activo; `?category=X` opcional |
| `GET` | `/api/products/{id}` | 🌐 | Detalle |
| `POST` | `/api/admin/products` | 🛡️ | Crear producto (201) |
| `PUT` | `/api/admin/products/{id}` | 🛡️ | Actualizar producto |
| `DELETE` | `/api/admin/products/{id}` | 🛡️ | Baja lógica (204) |

**`OrderController`**

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `POST` | `/api/orders` | 🔒 | Crear pedido; body `[{productId, quantity},…]` |
| `GET` | `/api/users/me/orders` | 🔒 | Mis pedidos |
| `GET` | `/api/admin/orders` | 🛡️ | Todos los pedidos del sistema |

### `OrderServiceImpl.createOrderForUser` — flujo completo

1. Cargar `User` por username del SecurityContext.
2. **Carrito vacío** → `InsufficientStockException`.
3. Para cada `OrderItemRequest` (antes de tocar stock):
   - `quantity < 1` → `InsufficientStockException`
   - Producto no encontrado → `ResourceNotFoundException` (404)
   - `product.active = false` → `InsufficientStockException`
   - `stock < quantity` → `InsufficientStockException`
4. Construir `ShopOrder` con `status="PAID"` (pago simulado).
5. Crear `OrderItem` por línea: captura `unitPrice` actual (snapshot).
6. Persistir (cascade ALL guarda los ítems).
7. `reduceStock` por cada línea **dentro de la misma `@Transactional`**.

### DTOs y Mappers

| Clase | Tipo | Uso |
|-------|------|-----|
| `ProductDTO` | DTO salida | id, name, description, price, stock, category, imageUrl, active |
| `ProductRequest` | DTO entrada admin | Con validaciones Bean Validation |
| `OrderItemRequest` | DTO entrada | `{ productId, quantity }` |
| `OrderDTO` | DTO salida | Pedido completo, anida lista de `OrderItemDTO` con `lineTotal` |
| `ProductMapper` | Mapper estático | `toDTO`, `toEntity`, `updateEntity` |
| `OrderMapper` | Mapper estático | `toDTO(ShopOrder)` incluyendo ítems anidados |
| `ReviewDTO` | DTO salida | id, username, stars, comment, verifiedPurchase, createdAt |
| `ReviewRequest` | DTO entrada | `stars` [1-5], `comment?` (max 1000 chars) |
| `ReviewMapper` | Mapper estático | `toDTO(Review)` — expone username, omite user.id/email |

### Entidad `Review` (nueva en v4.0)

| Campo | Tipo | Restricciones |
|-------|------|------------------|
| `id` | `Long` | PK |
| `product` | `Product` | `@ManyToOne(LAZY)` |
| `user` | `User` | `@ManyToOne(LAZY)` |
| `stars` | `Integer` | `@Min(1) @Max(5)` |
| `comment` | `String` | TEXT, nullable — max 1000 chars (validado en DTO) |
| `verifiedPurchase` | `Boolean` | Calculado al crear: `true` si el user tiene pedido PAID con ese producto |
| `createdAt` | `LocalDateTime` | `@PrePersist`, inmutable |

Restricción de BD: `@UniqueConstraint(columnNames = {"product_id","user_id"})` — un usuario, una reseña por producto.

### Controlador `ReviewController` (nuevo en v4.0)

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `GET` | `/api/products/{productId}/reviews` | 🌐 | Paginado; `?page&size&sort=recent\|top` |
| `POST` | `/api/products/{productId}/reviews` | 🔒 | Crear reseña (usuario autenticado) |

Reglas de negocio de `ReviewServiceImpl.submit`:
1. Producto no activo / no existe → 404.
2. Usuario ya valoró ese producto → `DuplicateReviewException` (409).
3. `verifiedPurchase` = `true` si existe un pedido PAID del usuario con ese producto.

---

## 11. Módulo ADMIN — Dashboard y panel de administración

### DTO `AdminDashboardDTO`

```java
long       totalUsers
long       totalPublishedEvents
long       totalActiveRegistrations
long       totalPaidOrders
BigDecimal totalRevenue
```

### `AdminDashboardServiceImpl`

Una sola llamada `getDashboardSummary()` ejecuta **5 queries baratas** en una
transacción `readOnly=true`:

| Métrica | Query |
|---------|-------|
| `totalUsers` | `userRepository.count()` |
| `totalPublishedEvents` | `eventRepository.countByStatus(PUBLISHED)` |
| `totalActiveRegistrations` | `registrationRepository.countByCancelledFalse()` |
| `totalPaidOrders` | `orderRepository.countByStatus("PAID")` |
| `totalRevenue` | `orderRepository.sumTotalAmountPaid()` |

### Endpoints admin consolidados

| Method | URL | Descripción |
|--------|-----|-------------|
| `GET` | `/api/admin/dashboard` | Dashboard — `AdminDashboardDTO` |
| `GET` | `/api/admin/events` | Todos los eventos (incluyendo DRAFT) |
| `POST` | `/api/admin/events` | Crear evento |
| `PUT` | `/api/admin/events/{id}` | Actualizar evento |
| `DELETE` | `/api/admin/events/{id}` | Cancelar evento (borrado lógico) |
| `GET` | `/api/admin/products` | Todos los productos (incluyendo inactivos) |
| `POST` | `/api/admin/products` | Crear producto |
| `PUT` | `/api/admin/products/{id}` | Actualizar producto |
| `DELETE` | `/api/admin/products/{id}` | Desactivar producto |
| `GET` | `/api/admin/orders` | Todos los pedidos del sistema |
| `GET` | `/api/admin/contact-messages` | Mensajes paginados (`?page=0&size=10`) |

Todos requieren `ROLE_ADMIN` via `HttpSecurity` + `@PreAuthorize`.

---

## 12. Módulo CONTACT — Mensajes de contacto

### Entidad `ContactMessage`

| Campo | Tipo | Restricciones |
|-------|------|--------------|
| `id` | `Long` | PK |
| `name` | `String` | `@NotBlank`, max 120 |
| `email` | `String` | `@Email`, `@NotBlank`, max 180 |
| `subject` | `String` | `@NotBlank`, max 255 |
| `message` | `String` | `@NotBlank`, `@Size(min=10)`, TEXT |
| `createdAt` | `LocalDateTime` | `@PrePersist` |

### Controlador (`ContactController`)

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `POST` | `/api/contact` | 🌐 | Enviar mensaje; 201 `ContactMessageDTO` |
| `GET` | `/api/admin/contact-messages` | 🛡️ | Listado paginado |

> **Nota frontend**: el modelo `ContactMessageDTO` en `admin.model.ts` incluye el campo `read: boolean`
> para que el componente `AdminContactMessagesComponent` pueda mostrar en negrita los mensajes no leídos.

---

## 13. Capa de DTOs y Mappers

### Inventario de mappers backend

| Mapper | Módulo | Métodos clave |
|--------|--------|---------------|
| `UserMapper` | users | `toDTO(User)`, `toDTOList(List<User>)` |
| `EventMapper` | events | `toDTO(Event)`, `toEntity(EventRequest)`, `updateEntity(EventRequest, Event)` |
| `RegistrationMapper` | registrations | `toDTO(Registration)` |
| `ProductMapper` | shop | `toDTO(Product)`, `toEntity(ProductRequest)`, `updateEntity(ProductRequest, Product)` |
| `OrderMapper` | shop | `toDTO(ShopOrder)` (incluye ítems anidados) |
| `ContactMessageMapper` | contact | `toDTO(ContactMessage)` |

### Patrón de mapper

```java
public final class EventMapper {
    private EventMapper() {}
    public static EventDTO toDTO(Event e) { … }
    public static Event toEntity(EventRequest r) { … }
    public static void updateEntity(EventRequest r, Event e) { … }
}
```

Clase final, constructor privado, métodos estáticos. Sin MapStruct. Sin Spring beans.

### Flujo request → response

```
[HTTP Request]   @Valid @RequestBody XxxRequest
      │
  Controller
      │  XxxMapper.toEntity(request)
      ▼
  Service  (@Transactional — lógica de negocio)
      │  XxxMapper.toDTO(entity)
      ▼
  Controller   ResponseEntity<XxxDTO>
      │
[HTTP Response]
```

---

## 14. Reglas de negocio

### Eventos

| Regla | Excepción | Código |
|-------|-----------|--------|
| `date` futura en create/update | Bean Validation `@Future` | 400 |
| No crear con `status = CANCELLED` | `EventStatusChangeNotAllowedException` | 422 |
| `status` null en create → DRAFT (no PUBLISHED) | — | — |
| Evento CANCELLED es inmutable | `EventStatusChangeNotAllowedException` | 422 |
| No poner `CANCELLED` via PUT | `EventStatusChangeNotAllowedException` | 422 |
| Para cancelar: usar `DELETE /api/admin/events/{id}` | — | — |

### Inscripciones

| Regla | Mensaje |
|-------|---------|
| Evento CANCELLED | *"el evento 'X' está cancelado"* |
| Evento DRAFT | *"todavía no está publicado (estado: DRAFT)"* |
| Fecha pasada | *"El evento ya ha tenido lugar"* |
| Aforo completo | *"aforo completo (N plazas)"* |
| Ya inscrito | *"Ya estás inscrito en este evento"* |
| Sin autorización para cancelar | *"No tienes permiso…"* |
| Ya cancelada | *"ya estaba cancelada"* |
| Menos de 48h para el evento | *"faltan N horas…"* |

### Pedidos

| Regla | Mensaje |
|-------|---------|
| Carrito vacío | *"El carrito está vacío…"* |
| `quantity < 1` | validación |
| Producto inactivo | *"no está disponible"* |
| Stock insuficiente | *"disponible: N, solicitado: M"* |
| Toda la creación es atómica | `@Transactional` + rollback |

---

## 15. Sistema de logging

El backend usa **SLF4J** (incluido en Spring Boot).

### Clases con logger

| Clase | Niveles usados |
|-------|---------------|
| `EventServiceImpl` | INFO (create/update/cancel), WARN (fecha inválida, CANCELLED edit) |
| `RegistrationServiceImpl` | INFO (crear/cancelar inscripción), WARN (cada rechazo con user+eventId) |
| `OrderServiceImpl` | INFO (pedido creado), WARN (carrito vacío, stock, producto inactivo) |
| `UserServiceImpl` | INFO (save/update/delete) |
| `GlobalExceptionHandler` | WARN (handlers 422 con URI), ERROR (fallback 500 con stack trace) |

---

## 16. API REST — Referencia completa de endpoints

### Leyenda de acceso

| Símbolo | Significado |
|---------|-------------|
| 🌐 | `permitAll()` — sin autenticación |
| 🔒 | `authenticated()` — cualquier usuario con JWT válido |
| 🛡️ | `hasRole("ADMIN")` — doble protección: HttpSecurity + @PreAuthorize |

### AUTH

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `POST` | `/login` | 🌐 | Login → JWT en cabecera `Authorization` |
| `POST` | `/api/auth/register` | 🌐 | Registro en 2 pasos; envía email de verificación; **202 Accepted** ← v4.0 |
| `GET` | `/api/auth/verify?token=<uuid>` | 🌐 | Confirma email y crea usuario ← NUEVO v4.0 |
| `POST` | `/api/auth/resend-verification` | 🌐 | Reenvía email de verificación (rate-limit 5 min) ← NUEVO v4.0 |

### USERS

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `GET` | `/api/users` | 🛡️ | Lista todos los usuarios |
| `GET` | `/api/users/page/{page}` | 🛡️ | Lista paginada (3/pág.) |
| `GET` | `/api/users/{id}` | 🛡️ | Detalle de usuario |
| `POST` | `/api/users` | 🛡️ | Crear usuario |
| `PUT` | `/api/users/{id}` | 🛡️ | Actualizar usuario |
| `DELETE` | `/api/users/{id}` | 🛡️ | Borrar usuario |
| `GET` | `/api/users/me` | 🔒 | Perfil propio |
| `PUT` | `/api/users/me` | 🔒 | Actualizar nombre, apellido, email, provincia, país y teléfono |
| `POST` | `/api/users/me/avatar` | 🔒 | Subir foto de perfil; `multipart/form-data` campo `file` |
| `DELETE` | `/api/users/me` | 🔒 | RGPD HU-11: anonimizar y desactivar cuenta |
| `GET` | `/api/users/me/registrations` | 🔒 | Mis inscripciones activas |
| `GET` | `/api/users/me/orders` | 🔒 | Mis pedidos |

### EVENTS

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `GET` | `/api/events` | 🌐 | Catálogo paginado PUBLISHED (filtros opcionales) |
| `GET` | `/api/events/{id}` | 🌐 | Detalle (solo PUBLISHED) |
| `GET` | `/api/admin/events` | 🛡️ | Todos los eventos (admin) |
| `POST` | `/api/admin/events` | 🛡️ | Crear evento |
| `PUT` | `/api/admin/events/{id}` | 🛡️ | Actualizar evento |
| `DELETE` | `/api/admin/events/{id}` | 🛡️ | Baja lógica → CANCELLED (204) |

### REGISTRATIONS

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `POST` | `/api/events/{eventId}/registrations` | 🔒 | Inscribirse; 201 `RegistrationDTO` |
| `DELETE` | `/api/registrations/{id}` | 🔒 | Cancelar inscripción |

### SHOP — PRODUCTOS

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `GET` | `/api/products` | 🌐 | Catálogo activo; `?category=X` |
| `GET` | `/api/products/{id}` | 🌐 | Detalle |
| `GET` | `/api/admin/products` | 🛡️ | Todos los productos (admin) |
| `POST` | `/api/admin/products` | 🛡️ | Crear producto (201) |
| `PUT` | `/api/admin/products/{id}` | 🛡️ | Actualizar producto |
| `DELETE` | `/api/admin/products/{id}` | 🛡️ | Baja lógica (204) |

### SHOP — PEDIDOS

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `POST` | `/api/orders` | 🔒 | Crear pedido; body `[{productId, quantity},…]` |
| `GET` | `/api/users/me/orders` | 🔒 | Mis pedidos |
| `GET` | `/api/admin/orders` | 🛡️ | Todos los pedidos del sistema |

### SHOP — RESEÑAS (nuevo v4.0)

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `GET` | `/api/products/{productId}/reviews` | 🌐 | Reseñas paginadas; `?page&size&sort=recent\|top` |
| `POST` | `/api/products/{productId}/reviews` | 🔒 | Crear reseña; body `{stars, comment?}`; 201 `ReviewDTO` |

### ADMIN y CONTACT

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `GET` | `/api/admin/dashboard` | 🛡️ | Métricas globales |
| `GET` | `/api/admin/contact-messages` | 🛡️ | Mensajes paginados |
| `POST` | `/api/contact` | 🌐 | Enviar mensaje; 201 `ContactMessageDTO` |
| `GET` | `/api/admin/events/{id}/registrations` | 🛡️ | Inscripciones de un evento (v3.5 — pendiente implementación backend) |

---

## 17. Modelo de Base de Datos

Hibernate genera las tablas automáticamente con `ddl-auto=update`.

```
users            → id, name, lastname, email, username, password,
                   province, country, phone, avatar_url,
                   enabled (default true), privacy_accepted_at
roles            → id, name
users_roles      → user_id (FK→users), role_id (FK→roles)  [ManyToMany]

events           → id, name, description, date, location, sport_type,
                   max_capacity, price, status, created_at, updated_at

registrations    → id, user_id (FK→users), event_id (FK→events),
                   registration_date, payment_status, bib_number,
                   cancelled, cancelled_at
                   UNIQUE(user_id, event_id)

products         → id, name, description, price, stock, category,
                   image_url, active, created_at, updated_at

shop_orders      → id, user_id (FK→users), created_at, total_amount, status

order_items           → id, order_id (FK→shop_orders), product_id (FK→products),
                        quantity, unit_price

reviews               → id, product_id (FK→products), user_id (FK→users),
                        stars, comment, verified_purchase, created_at
                        UNIQUE(product_id, user_id)              ← NUEVO v4.0

pending_registrations → id, token, name, lastname, email, username,
                        password_hash, province, country, phone,
                        created_at, expires_at, last_sent_at      ← NUEVO v4.0

contact_messages      → id, name, email, subject, message, created_at
```

### Relaciones principales

```
User ───< Registration >─── Event
User ───< ShopOrder ────< OrderItem >─── Product
User ───< Review >────────────────── Product
```

---

## 18. Flujo de Autenticación JWT

```
[Client]  POST /login {username, password}
              │
              ▼
  JwtAuthenticationFilter
    1. deserializa credenciales
    2. AuthenticationManager → JpaUserDetailsService → BCrypt
    3. genera JWT firmado (SECRET_KEY)
    4. devuelve Authorization: Bearer <token>

[Client]  GET /api/...  Authorization: Bearer <token>
              │
              ▼
  JwtValidationFilter
    1. extrae header Authorization
    2. verifica firma HMAC y expiración
    3. deserializa roles (SimpleGrantedAuthorityJsonCreator)
    4. carga SecurityContext
              │
              ▼
    Controlador (si autorizado)
```

---

## 19. Configuración de Seguridad

### Reglas `HttpSecurity` — `SecurityFilterChain`

```
── PÚBLICO (permitAll) ──────────────────────────────────────────────────
POST  /login
POST  /api/auth/register
GET   /api/events, /api/events/**
GET   /api/products, /api/products/**
POST  /api/contact
GET   /uploads/**

── AUTENTICADO — perfil propio (ANTES de las reglas /{id}) ──────────────
⚠️  ORDEN CRÍTICO: /me debe preceder a /api/users/{id} porque Spring
    Security evalúa en orden y {id} coincide con el literal "me".
GET|PUT|DELETE  /api/users/me
POST            /api/users/me/avatar
GET             /api/users/me/registrations
GET             /api/users/me/orders

── SOLO ADMIN (hasRole("ADMIN")) ────────────────────────────────────────
GET|POST|PUT|DELETE  /api/users, /api/users/{id}, /api/users/page/{page}
/**  /api/admin/**   →  cubre dashboard, eventos, productos, pedidos, mensajes

── AUTENTICADO (cualquier JWT válido) ───────────────────────────────────
POST     /api/events/*/registrations
DELETE   /api/registrations/**
POST     /api/orders

── CATCH-ALL ────────────────────────────────────────────────────────────
anyRequest().authenticated()
```

### CORS

```
Origen:        http://localhost:4200
Métodos:       GET, POST, PUT, DELETE
Headers:       Authorization, Content-Type
Credentials:   true
```

### Sesiones

`SessionCreationPolicy.STATELESS` — sin estado en servidor.

---

## 20. Frontend Angular — Arquitectura

SPA Angular 21. Componentes standalone (sin NgModules). Arquitectura basada en:

- **`core/`** — servicios singleton, guards, interceptores y modelos.
- **`features/`** — módulos de funcionalidad en carpetas por dominio.
- **`shared/`** — componentes reutilizables (Navbar, Paginator, Alerts).

### Rutas (`app.routes.ts`)

```typescript
{ path: '',               redirectTo: 'home', pathMatch: 'full' }

// Públicas
{ path: 'home',           component: HomeComponent }
{ path: 'login',          component: LoginComponent }
{ path: 'register',       component: RegisterComponent }
{ path: 'events',         component: EventsListComponent }
{ path: 'events/:id',     component: EventDetailComponent }
{ path: 'shop',           component: ProductListComponent }
{ path: 'shop/products/:id', component: ProductDetailComponent }
{ path: 'cart',           component: CartComponent }

// Autenticadas
{ path: 'contact',        component: ContactComponent,        canActivate: [authGuard] }
{ path: 'profile',        component: ProfileComponent,        canActivate: [authGuard] }
{ path: 'events/:id/register', component: RegistrationWizardComponent, canActivate: [authGuard] },  // ← v3.5 wizard
{ path: 'my-registrations', component: MyRegistrationsComponent, canActivate: [authGuard] },
{ path: 'checkout',       component: CheckoutComponent,       canActivate: [authGuard] }
{ path: 'my-orders',      component: MyOrdersComponent,       canActivate: [authGuard] }

// Verificación de email
{ path: 'auth/verify',    component: VerifyEmailComponent }                              // ← v4.0

// Legal (públicas)                                                                        // ← NUEVO v4.1
{ path: 'privacy',        component: PrivacyPolicyComponent }
{ path: 'terms',          component: TermsOfUseComponent }
{ path: 'cookies',        component: CookiesPolicyComponent }

// Admin (shell con router-outlet propio)
{
  path: 'admin',
  component: AdminShellComponent,
  canActivate: [adminGuard],
  children: [
    { path: '',                component: AdminDashboardComponent },
    { path: 'dashboard',       component: AdminDashboardComponent },
    { path: 'users',           component: AdminUsersListComponent },
    { path: 'users/page/:page',component: AdminUsersListComponent },
    { path: 'users/create',    component: AdminUserFormComponent },
    { path: 'users/edit/:id',  component: AdminUserFormComponent },
    { path: 'events',          component: AdminEventsComponent },
    { path: 'events/:id',      component: AdminEventDetailComponent },  // ← NUEVO v3.5
    { path: 'products',        component: AdminProductsComponent },
    { path: 'orders',          component: AdminOrdersComponent },
    { path: 'contact-messages',component: AdminContactMessagesComponent },
  ]
}
```

### `app.config.ts`

```typescript
providers: [
  provideRouter(routes, withComponentInputBinding()),
  provideHttpClient(withInterceptors([authInterceptor])),
]
```

El `authInterceptor` se registra aquí como interceptor funcional (Angular 17+ API).

---

## 21. Frontend Angular — Módulo Core

### Guards

| Guard | Función |
|-------|---------|
| `authGuard` | Si no autenticado → redirige a `/login?returnUrl=…` |
| `adminGuard` | Si no autenticado o no admin → redirige a `/login` |

### `authInterceptor` (interceptor funcional)

```typescript
// Rutas excluidas: /login, /api/auth/register
// Para el resto: añade header Authorization: Bearer <token>
const token = inject(AuthService).token;
if (token) {
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
}
```

### Modelos (`core/models/`)

| Archivo | Tipos exportados |
|---------|-----------------|
| `auth.model.ts` | `LoginResponse`, `RegisterRequest` (incl. `province`, `country`, `phone`, `acceptedPrivacyPolicy`), `UserResponse`, `ApiError`, `UserProfileDTO` (incl. `province?`, `country?`, `phone?`, `avatarUrl?`, `roles`), `ProfileUpdateRequest` (incl. campos opcionales de perfil) |
| `event.ts` | `EventDTO`, `PagedResponse<T>` |
| `registration.ts` | `RegistrationDTO` |
| `user.model.ts` | `User` (clase para formularios admin) |
| `product.ts` | `ProductDTO`, `CartItem` |
| `order.ts` | `OrderItemRequest`, `OrderItemDTO`, `OrderDTO` |
| `participant.ts` | `ParticipantDTO` (`bibNumber?`, `name`, `lastnameInitial`, `club?`) ← NUEVO v3.5 |
| `admin.model.ts` | `AdminDashboardDTO`, `ContactMessageDTO` (incluye `read: boolean`), `EventRequest`, `ProductRequest`, `AdminOrderDTO`, `AdminOrderItemDTO`, `EventRegistrationAdminDTO`, `EventPaymentAdminDTO` ← NUEVOS v3.5 |

### Servicios (`core/services/`)

#### `AuthService`

| Método / propiedad | Descripción |
|--------------------|-------------|
| `login(credentials)` | POST `/login` → guarda JWT en `sessionStorage` (clave `cl_token`) |
| `register(request)` | POST `/api/auth/register` |
| `logout()` | Elimina token de `sessionStorage` |
| `isAuthenticated()` | Comprueba presencia del token y valida campo `exp` del payload |
| `isAdmin()` | Lée `isAdmin` o `authorities` del payload JWT para verificar `ROLE_ADMIN` |
| `getPayload(token?)` | Decodifica el payload Base64 del JWT; devuelve `null` si inválido |
| `getCurrentUsername()` | Retorna `payload.sub` del JWT activo; `null` si no autenticado |
| `token` (getter) | JWT almacenado en `sessionStorage` |
| `user` (getter) | `{ isAuth, isAdmin, user: { username } }` derivado del payload |
| **`authState$`** | **`Observable<boolean>`** — emite reactivamente cada vez que el estado de autenticación cambia (login / logout). Los componentes se suscriben para actualizar la UI al instante. ← NUEVO v3.1 |

> El token se guarda en `sessionStorage` bajo la clave `cl_token` (no `localStorage`) para limitar el riesgo XSS.

> **Estado reactivo (v3.1)**: Internamente `AuthService` mantiene un `BehaviorSubject<boolean>` (`_authState$`) que emite `true` al guardar token (`_saveToken()`) y `false` al hacer `logout()`. Los componentes como `NavbarComponent` y `HomeComponent` se suscriben a `authState$` en su `ngOnInit()` con `takeUntil(destroy$)`, de modo que la UI se actualiza **instantáneamente** tras login o logout sin necesidad de recargar la página.

> **Métodos deprecados** (aún presentes por compatibilidad): `loginUser()` → usar `login()`; `authenticated()` → usar `isAuthenticated()`.

#### `ContactService`

```typescript
POST /api/contact   →  sendContactMessage(body: ContactRequest): Observable<void>
```

`ContactRequest`: `{ name, email, subject, message }` (todos obligatorios).  
Responde `201` en éxito o `ApiError` en caso de validación.

#### `CartService` — singleton con BehaviorSubject

```typescript
private itemsSubject = new BehaviorSubject<CartItem[]>([]);
items$ = itemsSubject.asObservable();   // para suscribirse en templates
```

| Método | Descripción |
|--------|-------------|
| `getItems()` | Array actual de CartItem |
| `addProduct(product, quantity?)` | Añade o incrementa cantidad |
| `updateQuantity(productId, quantity)` | Actualiza; `quantity ≤ 0` → elimina |
| `removeProduct(productId)` | Elimina línea |
| `clearCart()` | Vacía el carrito |
| `getTotal()` | Suma `price × quantity` de todos los ítems |
| `getTotalQuantity()` | Número total de unidades (para badge de navbar) |

#### `ProductService`

| Método | Endpoint |
|--------|---------|
| `getProducts(category?)` | `GET /api/products?category=X` |
| `getProductById(id)` | `GET /api/products/{id}` |
| `getAllProductsAdmin()` | `GET /api/admin/products` |
| `createProduct(body)` | `POST /api/admin/products` |
| `updateProduct(id, body)` | `PUT /api/admin/products/{id}` |
| `deactivateProduct(id)` | `DELETE /api/admin/products/{id}` |

#### `OrderService`

| Método | Endpoint |
|--------|---------|
| `createOrder(items)` | `POST /api/orders` |
| `getMyOrders()` | `GET /api/users/me/orders` |

#### `ProfileService` ← ACTUALIZADO v3.7

**Archivo**: `core/services/profile.service.ts` — `providedIn: 'root'`

Expone un stream reactivo `avatarUrl$: Observable<string | null>` (BehaviorSubject) que emite cada vez que se carga o se actualiza el avatar, permitiendo al navbar y otros componentes mostrar la imagen actualizada al instante.

| Método / propiedad | Descripción |
|--------------------|-------------|
| `getProfile()` | `GET /api/users/me` → `UserProfileDTO`; normaliza `avatarUrl` a URL absoluta |
| `updateProfile(payload)` | `PUT /api/users/me` → `UserProfileDTO`; acepta `province?`, `country?`, `phone?` |
| `uploadAvatar(file)` | `POST /api/users/me/avatar` (multipart); actualiza `avatarUrl$` |
| `deleteAccount()` | `DELETE /api/users/me` → RGPD HU-11 |
| `avatarUrl$` | `Observable<string \| null>` — URL absoluta del avatar del usuario activo |
| `resolveUrl(url?)` | Convierte una ruta relativa `/uploads/...` en URL absoluta contra el backend |
| `clearAvatar()` | Emite `null` en `avatarUrl$`; llamado en `logout()` |

```typescript
// geo.constants.ts  (core/constants/)
export const SPAIN_PROVINCES: string[]   // 52 provincias de España
export const COUNTRIES: Country[]        // lista de países con código ISO
export const PHONE_PREFIXES: PhonePrefix[] // prefijos telefónicos internacionales
export interface Country      { name: string; code: string }
export interface PhonePrefix  { name: string; prefix: string }
```

#### `AdminService`

| Método | Endpoint |
|--------|---------|
| `getDashboard()` | `GET /api/admin/dashboard` |
| `getAllOrders()` | `GET /api/admin/orders` |
| `getContactMessages(page, size)` | `GET /api/admin/contact-messages?page=…&size=…` |
| `getEventRegistrations(eventId)` | `GET /api/admin/events/{id}/registrations` ← NUEVO v3.5 |
| `getEvent(eventId)` | `GET /api/events/{id}` — reutiliza endpoint público desde AdminService ← NUEVO v3.5 |
| `downloadCSV(rows, filename)` | Genera y descarga `.csv` en el navegador (sin backend) ← NUEVO v3.5 |

#### `AuthDialogService` ← NUEVO v3.5

**Archivo**: `core/services/auth-dialog.service.ts` — `providedIn: 'root'`

Encapsula el flujo "requiere autenticación": si el usuario está autenticado ejecuta la acción; si no, muestra un diálogo SweetAlert2 con opciones de **Iniciar sesión** / **Registrarse** / **Cancelar** y redirige con `returnUrl`.

```typescript
requireAuth(returnUrl: string, action: () => void): void
```

Uso en componentes:

```typescript
this.authDialog.requireAuth('/events/5/register', () =>
  this.router.navigate(['/events', 5, 'register'])
);
```

#### `EventService`

Métodos públicos: `getEvents(params)`, `getEventById(id)`.  
Métodos admin: `getAllEventsAdmin()`, `createEvent(body)`, `updateEvent(id, body)`, `deleteEvent(id)`.

---

---

## 22. Frontend Angular — Módulo Home

### `HomeComponent` (`/home`)

Página de bienvenida — punto de entrada de la SPA (la ruta raíz `/` redirige aquí).

**Archivos**: `features/home/home.component.ts` · `.html` · `.css`

> **Actualizado en v3.2** — Reestructuración visual de la página principal. Secciones eliminadas, vídeo hero siempre visible y sección "Sobre nosotros" con imagen estática.

#### Secciones actuales del layout

| Orden | Sección | Descripción |
|-------|---------|-------------|
| ① | **Hero con vídeo** | Vídeo de fondo `assets/videos/hero.mp4` (`autoplay muted loop playsinline`). Siempre visible independientemente de si el usuario está autenticado. Overlay oscuro + saludo dinámico + CTA. |
| ② | **Próximos eventos** | Grid con los 3 próximos eventos `PUBLISHED` (petición a `EventService.getEvents({ page:0, size:3 })`). |
| ③ | **Sobre nosotros** | Imagen estática `assets/images/sobre-nostros.jpg` + texto descriptivo de la empresa. |
| ④ | **Contacto teaser** | Franja con CTA hacia `/contact`. |

#### Secciones eliminadas (v3.2)

| Sección eliminada | Motivo |
|-------------------|--------|
| ~~Cómo funciona~~ | Simplificación del layout. Eliminada del HTML y sus clases CSS (`.how-it-works`, `.how-it-works__grid`, `.how-it-works__card`, etc.). |
| ~~Trust band~~ ("100% Online / Confirmación inmediata") | Simplificación del layout. Eliminada del HTML y sus clases CSS (`.trust-band`, `.trust-band__list`, `.trust-band__item`, etc.). |

#### Hero — comportamiento del vídeo

- El `<video>` lleva explícitamente `autoplay muted loop playsinline` → sin audio en todos los navegadores.
- La sección hero **siempre se renderiza**, sin `@if` condicional al estado de autenticación.
- Solo el texto interior cambia según `isAuthenticated`:
  - Autenticado → `Bienvenido, <username>`
  - Anónimo → `Bienvenido a CronoLimits`

```html
<video class="home-hero__video"
       autoplay muted loop playsinline
       poster="assets/images/hero-poster.jpg"
       aria-hidden="true">
  <source src="assets/videos/hero.mp4" type="video/mp4" />
</video>
```

#### Sección "Sobre nosotros" — imagen estática

En v3.2 el vídeo secundario de la sección "Sobre nosotros" fue reemplazado por una imagen estática:

```html
<!-- ANTES (v3.1) -->
<video class="cl-about__video" autoplay muted loop playsinline aria-hidden="true">
  <source src="assets/videos/hero.mp4" type="video/mp4" />
</video>

<!-- AHORA (v3.2) -->
<img class="cl-about__img"
     src="assets/images/sobre-nostros.jpg"
     alt="Sobre CronoLimits" />
```

CSS: `.cl-about__video` renombrado a `.cl-about__img` manteniendo los mismos estilos (`object-fit: cover`, `max-height: 340px`).

**Asset requerido**: `src/assets/images/sobre-nostros.jpg`

#### Estado del componente

| Propiedad | Tipo | Uso |
|-----------|------|-----|
| `isAuthenticated` | `boolean` | Controla el texto del saludo — se actualiza reactivamente vía `authState$` |
| `username` | `string \| null` | Nombre mostrado en el saludo del hero |
| `upcomingEvents` | `EventDTO[]` | Los 3 próximos eventos cargados con `getEvents()` |
| `eventsLoading` | `boolean` | Muestra spinner mientras carga |
| `eventsError` | `string \| null` | Muestra alerta si falla la petición |
| `destroy$` | `Subject<void>` | Limpieza de suscripciones (`takeUntil`) en `ngOnDestroy` |

#### Métodos helper

| Método | Descripción |
|--------|-------------|
| `formatDate(dateStr)` | `toLocaleDateString('es-ES', { day:'2-digit', month:'long', year:'numeric' })` |
| `formatPrice(event)` | Devuelve `"GRATUITO"` si `isFree \|\| price === 0`, si no `"X.XX €"` |

#### Sintaxis Angular utilizada

- `@if / @else` y `@for` (Angular 17+ control flow).
- `takeUntil(destroy$)` para evitar memory leaks al destruir el componente.
- Imports standalone: `CommonModule`, `RouterModule`.

---

## 23. Frontend Angular — Módulo Contact

### `ContactComponent` (`/contact`)

Formulario de contacto público. Usa `ReactiveFormsModule`.

**Archivos**: `features/contact/contact.component.ts`, `contact.component.html`, `contact.component.css`

#### Campos del formulario (`FormGroup`)

| Campo | Validaciones |
|-------|-------------|
| `name` | `required`, `minLength(2)` |
| `email` | `required`, `email` |
| `subject` | `required`, `minLength(3)` |
| `message` | `required`, `minLength(10)` |

#### Flujo de envío

1. `onSubmit()` → si formulario inválido → `markAllAsTouched()` (muestra todos los errores).
2. Si válido → `ContactService.sendContactMessage(form.value)`.
3. **Éxito** → banner verde, formulario reseteado.
4. **Error** → muestra `err.error.message` (ApiError) o mensaje genérico.

#### Estado del componente

| Propiedad | Descripción |
|-----------|-------------|
| `sending` | `boolean` — deshabilita el botón durante la petición |
| `success` | `boolean` — muestra alerta de éxito |
| `errorMsg` | `string \| null` — muestra alerta de error con el mensaje del backend |

#### `ContactService` (frontend)

```typescript
// core/services/contact.service.ts
sendContactMessage(body: ContactRequest): Observable<void>
// POST http://localhost:8080/api/contact
```

```typescript
export interface ContactRequest {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}
```

Servicio `providedIn: 'root'`. Sin autenticación requerida (ruta pública).

#### Layout de la página

Dos columnas (`contact-grid`):
- **Columna izquierda**: formulario reactivo con validación inline.
- **Columna derecha** (aside): dirección, teléfono, email, horario, mapa placeholder y enlaces a redes sociales.

---

## 24. Frontend Angular — Módulo Tienda (Shop)

### `ProductListComponent` (`/shop`)

- `ngOnInit` → llama a `ProductService.getProducts()`.
- Filtro por categoría: `<select>` con `(change)` que re-llama a `getProducts(category)`.
- Grid de cards (Bootstrap `row-cols-*`): imagen, nombre, precio, stock.
- Botón **Añadir** → `CartService.addProduct(product)`. Deshabilitado si `stock === 0`.
- Botón **Ver detalle** → `routerLink="/shop/products/:id"`.

### `ProductDetailComponent` (`/shop/products/:id`)

- `ngOnInit` → extrae `id` de `ActivatedRoute`, llama a `getProductById(id)`.
- Input `number` para seleccionar cantidad (1 … stock).
- Botón **Añadir al carrito** → `CartService.addProduct(product, quantity)`.
- Mensaje de confirmación con `setTimeout`.

### `CartComponent` (`/cart`)

- Se suscribe a `CartService.items$` en `ngOnInit` con `takeUntil(destroy$)` para evitar memory leaks.
- Implementa `OnDestroy` con patrón `Subject<void>` ← NUEVO v3.1.
- Tabla: producto (con imagen miniatura), cantidad editable (`input number`), precio unitario, subtotal.
- Evento `(change)` en cantidad → `CartService.updateQuantity(id, qty)`.
- Botón ✕ → `CartService.removeProduct(id)`.
- Total calculado mediante `CartService.getTotal()`.
- Mensaje "Tu carrito está vacío" cuando `items.length === 0`.
- Botón **Ir al pago** → `routerLink="/checkout"`.

### `CheckoutComponent` (`/checkout`, `canActivate: [authGuard]`)

- `ngOnInit` → lee `CartService.getItems()`; si vacío → redirige a `/shop`.
- Muestra resumen de ítems y total.
- Botón **Confirmar pedido**:
  1. Construye `OrderItemRequest[]` desde `CartItem[]`.
  2. Llama a `OrderService.createOrder(items)`.
  3. Si OK → `CartService.clearCart()` → mensaje de éxito → redirige a `/my-orders`.
  4. Si error 422 → muestra `err.error.message` (stock insuficiente / carrito vacío).

### `MyOrdersComponent` (`/my-orders`, `canActivate: [authGuard]`)

- Llama a `OrderService.getMyOrders()`.
- Tabla: id, fecha, estado (badge de color), total.
- Botón **Ver detalles** → expande fila con `OrderItemDTO[]` (productName, quantity, unitPrice, lineTotal).

### Navbar — badge del carrito y estado reactivo

```typescript
// navbar.ts
cartCount$ = this.cartService.items$.pipe(
  map(items => items.reduce((acc, i) => acc + i.quantity, 0))
);
```

```typescript
// navbar.ts — suscripción reactiva al estado de autenticación (v3.1)
ngOnInit(): void {
  this.authService.authState$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => this.refreshAuthState());
}
```

> **v3.1**: El navbar se suscribe a `authState$` en `ngOnInit()`. Cada vez que el `BehaviorSubject` emite (login/logout), se llama `refreshAuthState()` que actualiza `isAuthenticated`, `isAdmin`, `username` e `initials`. El resultado es una actualización **instantánea** de la UI sin necesidad de recargar.

```html
<!-- navbar.html — Angular 17+ new control flow -->
@if (((cartCount$ | async) ?? 0) > 0) {
  <span class="badge rounded-pill bg-danger">{{ (cartCount$ | async) ?? 0 }}</span>
}
```

> **Nota**: La sintaxis `@if (...) as count` **no está soportada** en el nuevo control flow de Angular 17+.
> Se usa `(cartCount$ | async) ?? 0` directamente en la condición y en la interpolación.

---

## 25. Frontend Angular — Módulo Admin

La ruta `/admin` tiene un **shell propio** (`AdminShellComponent`) con `<app-navbar>` y
`<router-outlet>`. Todas las rutas hijas están protegidas por `adminGuard`.

### Componentes admin

| Componente | Ruta | Funcionalidad |
|------------|------|---------------|
| `AdminDashboardComponent` | `/admin` | 5 KPI cards con links (users, events, products, orders, revenue) |
| `AdminUsersListComponent` | `/admin/users` | Tabla paginada con editar/eliminar/crear |
| `AdminUserFormComponent` | `/admin/users/create` y `/admin/users/edit/:id` | Formulario crear/editar usuario |
| `AdminEventsComponent` | `/admin/events` | Lista + formulario inline. CRUD completo. Badges de estado. |
| `AdminEventDetailComponent` | `/admin/events/:id` | Vista de detalle de evento con 3 pestañas: Resumen, Inscripciones y Pagos. ← NUEVO v3.5 |
| `AdminProductsComponent` | `/admin/products` | Lista + formulario inline. Fila `table-warning` (stock < 5), `table-danger` (stock = 0). Desactivar producto. |
| `AdminOrdersComponent` | `/admin/orders` | Solo lectura. Filas expandibles con `OrderItemDTO[]` + username/email del pedido. |
| `AdminContactMessagesComponent` | `/admin/contact-messages` | Lista paginada. Filas expandibles con el mensaje completo. Negrita en mensajes no leídos. |

### `AdminShellComponent` — patrón EventEmitter

El shell centraliza las operaciones de escritura de usuarios:

```
AdminUsersListComponent  →(EventEmitter)→  AdminShellComponent  →(UserService)→  Backend
AdminUserFormComponent   →(EventEmitter)→  AdminShellComponent  →(UserService)→  Backend
```

Usa `SharingDataService` con `EventEmitter`s:
- `newUserEventEmitter` — crea o actualiza usuario.
- `idUserEventEmitter` — solicita eliminar usuario.
- `findUserByIdEventEmitter` — carga usuario para editar.
- `selectedUserEventEmitter` — envía usuario al formulario.
- `pageUserFormEventEmitter` — sincroniza lista de usuarios tras operaciones.

### Navbar admin (`shared/components/navbar`)

```html
@if (isAdmin) {
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" ...>Administración</a>
    <ul class="dropdown-menu">
      <li><a [routerLink]="['/admin/dashboard']">Dashboard</a></li>
      <li><a [routerLink]="['/admin/users']">Usuarios</a></li>
      <li><a [routerLink]="['/admin/events']">Eventos</a></li>
      <li><a [routerLink]="['/admin/products']">Productos</a></li>
      <li><a [routerLink]="['/admin/orders']">Pedidos</a></li>
      <li><a [routerLink]="['/admin/contact-messages']">Mensajes</a></li>
    </ul>
  </li>
}
```

---

## 26. Configuración y Arranque

### Prerrequisitos

- Java 17+, Maven 3.9+ (o `mvnw`)
- PostgreSQL 15+ en `localhost:5432`
- Node.js 20+ y Angular CLI 21

### Base de datos

```sql
CREATE DATABASE cronolimits_db;
```

### Backend

```bash
cd cronolimits-backend
.\mvnw.cmd spring-boot:run     # Windows PowerShell
./mvnw spring-boot:run         # Linux / macOS
```

Disponible en: `http://localhost:8080`

### Frontend

```bash
cd cronolimits-frontend
npm install
ng serve
```

Disponible en: `http://localhost:4200`

---

## 27. Variables de entorno y application.properties

```properties
spring.application.name=cronolimits-backend

# DataSource
spring.datasource.url=jdbc:postgresql://localhost:5432/cronolimits_db
spring.datasource.username=postgres
spring.datasource.password=root
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA / Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=true

# Logging
logging.level.root=WARN
logging.level.com.springboot.backend.singh.usersapp.cronolimits=INFO
logging.level.org.springframework.web.servlet.DispatcherServlet=DEBUG
logging.pattern.console=%d{HH:mm:ss.SSS} %highlight(%-5level) %cyan(%logger{30}) - %msg%n

# Uploads (WebConfig + ProfileController + EventController)
app.upload-dir=uploads/avatars
app.events-upload-dir=uploads/events
spring.servlet.multipart.max-file-size=5MB
spring.servlet.multipart.max-request-size=5MB

# Email / Gmail SMTP  ← NUEVO v4.0
# Variables de entorno obligatorias para enviar emails:
#   GMAIL_ADDRESS      → tu dirección Gmail
#   GMAIL_APP_PASSWORD → App Password de 16 caracteres (no la contraseña real)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${GMAIL_ADDRESS:parksingh005@gmail.com}
spring.mail.password=${GMAIL_APP_PASSWORD:}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.test-connection=false

# URLs de aplicación  ← NUEVO v4.0
app.mail.from=${GMAIL_ADDRESS:parksingh005@gmail.com}
app.frontend.url=http://localhost:4200
```

> En producción externalizar `spring.datasource.password`, la clave JWT, `GMAIL_ADDRESS` y `GMAIL_APP_PASSWORD` a variables de entorno o un gestor de secretos.

---

## 28. Ejemplos Postman por módulo

### Auth

```http
### Registro (v4.0 — registro en 2 pasos, devuelve 202)
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "Ana", "lastname": "García",
  "username": "anagarcia", "email": "ana@example.com",
  "password": "miPassword1",
  "province": "Madrid", "country": "España",
  "phonePrefix": "+34", "phoneNumber": "612345678",
  "acceptedPrivacyPolicy": true
}
→ 202 { "message": "Hemos enviado un enlace de confirmación a ana@example.com..." }

### Confirmar email (enlace del correo)
GET http://localhost:8080/api/auth/verify?token=<uuid>
→ 200 { "message": "Tu cuenta ha sido activada correctamente..." }

### Reenviar correo de verificación
POST http://localhost:8080/api/auth/resend-verification
Content-Type: application/json
{ "email": "ana@example.com" }
→ 200 { "message": "Te hemos enviado un nuevo enlace de confirmación." }

### Login
POST http://localhost:8080/login
Content-Type: application/json
{ "username": "anagarcia", "password": "miPassword1" }
→ 200  Header: Authorization: Bearer eyJhbGci...
```

### Tienda

```http
### Catálogo
GET http://localhost:8080/api/products?category=CAMISETAS
→ 200 List<ProductDTO>

### Crear pedido
POST http://localhost:8080/api/orders
Authorization: Bearer <token_usuario>
Content-Type: application/json
[{ "productId": 1, "quantity": 2 }, { "productId": 5, "quantity": 1 }]
→ 201 OrderDTO

### Carrito vacío → 422
POST http://localhost:8080/api/orders   []
→ 422 { "message": "El carrito está vacío…" }

### Stock insuficiente → 422
[{ "productId": 1, "quantity": 9999 }]
→ 422 { "message": "Stock insuficiente para 'Camiseta' (disponible: 3, solicitado: 9999)" }
```

### Reseñas (nuevo v4.0)

```http
### Listar reseñas de un producto (público, más recientes)
GET http://localhost:8080/api/products/1/reviews?page=0&size=10&sort=recent
→ 200 Page<ReviewDTO>

### Ordenar por valoración más alta
GET http://localhost:8080/api/products/1/reviews?sort=top
→ 200 Page<ReviewDTO>

### Enviar reseña (autenticado)
POST http://localhost:8080/api/products/1/reviews
Authorization: Bearer <token_usuario>
Content-Type: application/json
{ "stars": 5, "comment": "Excelente calidad, lo recomiendo." }
→ 201 ReviewDTO

### Reseña duplicada → 409
→ 409 { "message": "Ya has valorado este producto. Solo se permite una reseña por producto." }
```

### Admin

```http
### Dashboard
GET http://localhost:8080/api/admin/dashboard
Authorization: Bearer <token_admin>
→ 200 { totalUsers, totalPublishedEvents, totalActiveRegistrations, totalPaidOrders, totalRevenue }

### Todos los pedidos
GET http://localhost:8080/api/admin/orders
Authorization: Bearer <token_admin>
→ 200 List<OrderDTO>

### Mensajes de contacto (paginado)
GET http://localhost:8080/api/admin/contact-messages?page=0&size=10
Authorization: Bearer <token_admin>
→ 200 PagedResponse<ContactMessageDTO>
```

### Seguridad

```http
### Sin token → 401
GET http://localhost:8080/api/users/me → 401

### ROLE_USER en zona admin → 403
GET http://localhost:8080/api/admin/dashboard
Authorization: Bearer <token_usuario> → 403
```

---

## 29. Decisiones de Diseño

### JWT en sessionStorage (no localStorage)

El token se elimina automáticamente al cerrar la pestaña/navegador, reduciendo la superficie
de ataque XSS. Para "recordarme" persistente se podría migrar a `localStorage` opcionalmente.

### `authInterceptor` funcional (Angular 17+ API)

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => { … }
```

Se registra en `appConfig` con `withInterceptors([authInterceptor])`, sin necesidad de
`HttpClientModule` ni clases `@Injectable`.

### `CartService` con BehaviorSubject

El carrito vive únicamente en memoria del cliente (no se persiste en BD ni localStorage).
`BehaviorSubject<CartItem[]>` permite que múltiples componentes (navbar badge, cart, checkout)
se suscriban al mismo estado reactivo sin acoplamiento.

### Capa DTO/Mapper — separación entidad/contrato de API

- Evita exponer campos internos (`password`, `createdAt`, timestamps).
- El modelo de BD puede evolucionar sin romper el contrato HTTP.
- Evita referencias circulares en serialización JSON (`ShopOrder ↔ OrderItem`).
- Los Request DTOs llevan validaciones Bean Validation independientes de la entidad.

### Borrado lógico en eventos y productos

Los eventos cancelados y los productos desactivados no se borran físicamente.
El historial de inscripciones y pedidos conserva las FK intactas.

### Rollback atómico en pedidos

`createOrderForUser` es `@Transactional`. `reduceStock` se ejecuta dentro de la misma
transacción: si falla cualquier línea de stock, toda la operación hace rollback.

### `ShopOrder` en lugar de `Order`

`ORDER` es palabra reservada SQL en PostgreSQL. `@Table(name="shop_orders")` evita
problemas con DDL automático.

### `unitPrice` snapshot al comprar

El historial de pedidos es inmutable respecto a cambios futuros de precio del producto.

### Defensa en profundidad: `HttpSecurity` + `@PreAuthorize`

`HttpSecurity` actúa en el filtro (antes del servlet).
`@PreAuthorize` actúa en el método (segunda barrera si se añaden rutas adicionales).

### `EventStatus.DRAFT` como default en create

Al crear un evento sin especificar `status`, se asigna `DRAFT` (no `PUBLISHED`).
El admin debe publicar explícitamente.

### Jackson 3 (`tools.jackson`)

Spring Boot 4 usa Jackson 3. El paquete base es `tools.jackson.databind`.
`com.fasterxml.jackson.databind` NO está en el classpath.

### Estado de autenticación reactivo (`authState$`) — NUEVO v3.1

El `AuthService` expone un `BehaviorSubject<boolean>` como `authState$: Observable<boolean>`.

```typescript
// AuthService (simplificado)
private readonly _authState$ = new BehaviorSubject<boolean>(this._checkAuth());
readonly authState$ = this._authState$.asObservable();

private _saveToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
  this._authState$.next(true);           // ← notifica a todos los suscriptores
}

logout(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  this._authState$.next(false);          // ← notifica a todos los suscriptores
}
```

**Problema resuelto**: Antes, `NavbarComponent` y `HomeComponent` leían el estado de autenticación
**una sola vez** en `ngOnInit()` (llamada imperativa a `isAuthenticated()`). Tras hacer login en
`LoginComponent` y navegar, el navbar ya estaba montado y nunca se enteraba del cambio — mostraba
"Iniciar sesión" en lugar del avatar de usuario.

**Solución**: Los componentes se suscriben a `authState$` en `ngOnInit()` con `takeUntil(destroy$)`.
Cada vez que el `BehaviorSubject` emite, el componente relee el estado y actualiza la UI al instante.

### Sistema de diseño global (Design Tokens) — NUEVO v3.1

La SPA utiliza un sistema de diseño centralizado en `src/styles.css` basado en custom properties CSS
(`:root`) con prefijo `cl-*`. Esto garantiza coherencia visual en toda la aplicación y facilita
cambios de tema o branding desde un único punto. Ver [Sección 31](#31-sistema-de-diseño-ui--design-tokens-y-css-global).

### Iconos SVG inline (Lucide-style) — NUEVO v3.1

Se reemplazaron **todos los emojis** del frontend por iconos SVG inline de estilo Lucide.
Esto mejora la consistencia visual, la accesibilidad, la renderización cross-browser y permite
estilizar los iconos con CSS (`stroke`, `fill`, `currentColor`). Clase utilitaria: `.cl-icon`
(20×20px, `vertical-align: -4px`, `stroke: currentColor`).

### Tipografía Inter (Google Fonts) — NUEVO v3.1

Se utiliza la fuente **Inter** (Google Fonts) como tipografía principal. Se carga con `<link>` en
`index.html` para optimizar el rendimiento (CDN de Google, cacheada globalmente). El `body` aplica
`font-family: 'Inter', system-ui, -apple-system, sans-serif`.

---

## 30. Estado del Proyecto — v5.0 / Roadmap

### ✅ Implementado (v5.0 — Mayo 2026)

#### Backend — Banco de preguntas y plantillas de formulario

- [x] **`FormQuestion.event` nullable** — `optional=true`, `nullable=true` para que una pregunta pueda pertenecer al banco global (sin evento).
- [x] **`FormQuestionRepository`** — 3 nuevos métodos para consultar el banco: `findByEventIsNull...`, `existsByEventIsNull...`, `findByIdAndEventIsNull`.
- [x] **`FormQuestionService` / `FormQuestionServiceImpl`** — 5 nuevos métodos: `getQuestionBank()`, `createBankQuestion()`, `updateBankQuestion()`, `deactivateBankQuestion()`, `addFromBankToEvent()`.
- [x] **`FormQuestionController`** — 5 nuevos endpoints `GET/POST/PUT/DELETE /api/admin/question-bank` + `POST /api/admin/events/:id/form-questions/add-from-bank/:bankId`.
- [x] **`FormTemplate` + `FormTemplateQuestion`** — nuevas entidades (tablas `form_templates`, `form_template_questions`) para snapshots de formularios reutilizables.
- [x] **`FormTemplateRepository`** — `findByActiveTrueOrderByCreatedAtDesc()`, `findByIsDefaultTrueAndActiveTrue()`.
- [x] **`FormTemplateService` / `FormTemplateServiceImpl`** — `getAll`, `getById`, `create`, `createFromEvent` (snapshot), `update`, `deactivate`, `setAsDefault`, `applyToEvent` (idempotente).
- [x] **`FormTemplateController`** — 8 endpoints `GET/POST/PUT/DELETE/PATCH /api/admin/form-templates` + `POST /api/admin/events/:id/form-questions/apply-template/:templateId`.

#### Frontend Angular — Form Builder y Banco de preguntas

- [x] **`form-question.ts`** — añadidos `FormTemplateDTO`, `FormTemplateQuestionDTO`, `FormTemplateRequest`.
- [x] **`form-builder.service.ts`** — añadidos métodos para banco (`getBankQuestions`, `createBankQuestion`, `updateBankQuestion`, `deleteBankQuestion`, `addFromBankToEvent`) y plantillas (`getTemplates`, `saveEventAsTemplate`, `applyTemplate`).
- [x] **`AdminFormBuilderComponent`** — nueva pestaña "🗄 Banco" en el catálogo, métodos `saveAsTemplate()` y `applyTemplate()` con SweetAlert2. Eliminado card "Nueva pregunta" y botón "Añadir bloque de texto" (simplificación UX).
- [x] **`QuestionBankComponent`** — nuevo componente CRUD en `/admin/question-bank` para gestionar preguntas globales.
- [x] **Ruta `/admin/question-bank`** añadida a `app.routes.ts`.

#### Simplificaciones de UI

- [x] **Dorsales y chips eliminados del frontend** — rutas `bibs`, importación `AdminBibsComponent`, enlace en sidebar, botón en event-detail, columnas y filtros en participantes. Los dorsales se asignan automáticamente de forma incremental (1, 2, 3…) por orden de inscripción.
- [x] **`angular.json`** — corregida referencia `5-user-app` → `cronolimits-frontend` en `buildTarget` del servidor de desarrollo.

#### Despliegue (AWS Amplify / CodeBuild)

- [x] **`amplify.yml`** — archivo de build para AWS Amplify: genera `environment.production.ts` en `preBuild` con variables `API_BASE_URL` y `STRIPE_PUBLISHABLE_KEY` desde la consola de Amplify.
- [x] **`buildspec.yml`** — alternativa para CodeBuild directo con misma estrategia de inyección de variables.
- [x] **`environment.production.ts`** permanece en `.gitignore`; se genera dinámicamente en cada deploy.

### ✅ Implementado (v4.1 — Abril 2026)

#### Backend

- [x] **Fix filtro de fechas en eventos** — `fromDate`/`toDate` cambiados a `LocalDate + ISO.DATE` (antes `LocalDateTime + ISO.DATE_TIME`). Compatible con `<input type="date">` del navegador. Conversión interna a `LocalDateTime` con `atStartOfDay()` / `atTime(23,59,59)`.
- [x] **`MethodArgumentTypeMismatchException` en `GlobalExceptionHandler`** — Nuevo handler que devuelve HTTP 400 con mensaje descriptivo cuando un `@RequestParam` tiene formato incorrecto (ej. fecha inválida). Evita caer al fallback 500.

#### Frontend Angular

- [x] **Módulo Legal** — 3 nuevas páginas públicas conformes a RGPD/LSSI-CE:
  - `PrivacyPolicyComponent` — `/privacy` — 8 secciones: responsable, datos recopilados, finalidades y base legal (RGPD art. 6), derechos ARCO (grid 6 ítems), enlace AEPD, seguridad, cookies, contacto.
  - `TermsOfUseComponent` — `/terms` — 8 secciones: objeto, acceso, condiciones de uso, precios y pagos, desistimiento (14 días RDLeg 1/2007), responsabilidad, propiedad intelectual, jurisdicción (Zaragoza, LSSI-CE).
  - `CookiesPolicyComponent` — `/cookies` — Tabla de tipos de cookies (Técnicas, Preferencias, Analíticas, Pagos), gestión por navegador, opt-out Google Analytics, terceros (Google, Stripe).
- [x] **Footer actualizado** — 3 enlaces legales con `routerLink` (SPA navigation, sin recarga de página): Política de privacidad, Términos de uso, Política de cookies.
- [x] **`app.routes.ts`** — añadidas rutas `/privacy`, `/terms`, `/cookies`.
- [x] **`EventsListComponent`** — mensajes de error diferenciados por código HTTP (400, 0, otros) para el filtro de fechas.

### ✅ Implementado (v2.0 — Abril 2026)

#### Backend

- [x] Módulo AUTH — JWT login/register, BCrypt, Spring Security
- [x] Módulo USERS — CRUD admin paginado + perfil propio
- [x] Módulo EVENTS — CRUD admin + catálogo público filtrable
- [x] Módulo REGISTRATIONS — inscripción/cancelación con reglas de negocio
- [x] Módulo SHOP — catálogo de productos, carrito, pedidos con control de stock atómico
- [x] Módulo ADMIN — dashboard con 5 KPIs, endpoints CRUD admin para eventos y productos, listado de todos los pedidos
- [x] Módulo CONTACT — formulario público + lectura admin paginada
- [x] GlobalExceptionHandler con ApiError uniforme
- [x] Sistema de logging SLF4J (INFO/WARN/ERROR)
- [x] CORS configurado para `http://localhost:4200`

#### Frontend Angular

- [x] `authInterceptor` funcional (JWT automático en todas las peticiones protegidas)
- [x] `authGuard` y `adminGuard`
- [x] Módulo Auth — Login / Register con manejo de errores ApiError
- [x] Módulo Profile — ver y editar perfil
- [x] **Módulo Home** — Landing page con hero animado, sección "cómo funciona", próximos eventos y trust band ← NUEVO v2
- [x] **Módulo Contact** — Formulario de contacto público con ReactiveFormsModule + `ContactService` ← NUEVO v2
- [x] Módulo Events — listado público filtrable y paginado + detalle de evento
- [x] Módulo Registrations — inscribirse, mis inscripciones, cancelar
- [x] Módulo Shop — ProductList, ProductDetail, CartComponent, CheckoutComponent, MyOrdersComponent
- [x] `CartService` — singleton reactivo con BehaviorSubject, badge en navbar
- [x] Módulo Admin — Dashboard (KPIs), AdminUsers (CRUD paginado), AdminEvents (CRUD inline), AdminProducts (CRUD inline con alertas de stock), AdminOrders (solo lectura), AdminContactMessages (paginado con indicador `read`)
- [x] Navbar con menú Administración (dropdown), badge carrito, links autenticados
- [x] **SweetAlert2** integrado para alertas UI ← NUEVO v2
- [x] **AuthService** refactorizado con `getPayload()`, `getCurrentUsername()`, validación `exp` y aliases `@deprecated` ← NUEVO v2

### ✅ Implementado (v3.1 — Abril 2026)

#### Sistema de Diseño UI

- [x] **Sistema de design tokens global** (`styles.css`) — 11 secciones con `:root` custom properties y prefijo `cl-*` ([ver sección 31](#31-sistema-de-diseño-ui--design-tokens-y-css-global))
- [x] **Tipografía Inter** (Google Fonts) — cargada vía CDN en `index.html`, aplicada en `body`
- [x] **Iconos SVG inline** (Lucide-style) — reemplazo de **todos los emojis** del frontend por SVGs escalables con clase `.cl-icon`
- [x] **Navbar rediseñado** — avatar con iniciales, dropdown con enlaces a perfil/ajustes/admin, SVGs en cada ítem, diseño responsive
- [x] **Hero rediseñado** — vídeo de fondo con gradient overlay diagonal navy→blue→cyan (160deg)
- [x] **Contact page** — iconos SVG en aside (ubicación, teléfono, email, horario, redes sociales)
- [x] **Limpieza CSS** — eliminadas ~250 líneas de CSS muerto/duplicado en `home.component.css`
- [x] **Unificación de badges y botones** — clases `cl-badge-*` y `cl-btn-*` consistentes en toda la app

#### Reactividad y rendimiento

- [x] **`AuthService.authState$`** — `BehaviorSubject<boolean>` que notifica login/logout reactivamente ([ver sección 32](#32-reactividad-del-estado-de-autenticación))
- [x] **Navbar reactivo** — suscrito a `authState$`, se actualiza instantáneamente tras login/logout sin recargar
- [x] **HomeComponent reactivo** — suscrito a `authState$` para actualizar bienvenida personalizada y CTAs
- [x] **Login loading fix** — `loading = false` movido al callback `next` (antes dependía de `complete`, podía dejar el spinner atascado)
- [x] **CartComponent memory leak fix** — añadido `OnDestroy` + `takeUntil(destroy$)` a la suscripción de `items$`
- [x] **Auditoría completa de loading states** — verificado que todos los componentes (23 auditados) fijan `loading = false` en rutas `next` y `error`

### ✅ Implementado (v3.7 — Abril 2026)

#### Backend

- [x] **Extensión entidad User** — `province`, `country`, `phone`, `avatarUrl`, `enabled`, `privacyAcceptedAt`
- [x] **`POST /api/users/me/avatar`** — subida de foto de perfil con validación MIME y almacenamiento en disco
- [x] **`DELETE /api/users/me`** — RGPD HU-11: borrado lógico con anonimización completa de PII
- [x] **`ProfileUpdateRequest`** extendido con `province`, `country`, `phone` y validación `@Pattern` E.164
- [x] **`RegisterRequest`** extendido con `province`, `country`, `phone` y `acceptedPrivacyPolicy` (`@AssertTrue`)

#### Frontend Angular

- [x] **`geo.constants.ts`** — 52 provincias españolas, lista de países y prefijos telefónicos internacionales
- [x] **`RegisterComponent`** ampliado con provincia, país, teléfono, política de privacidad y validadores personalizados
- [x] **`ProfileComponent`** rediseñado — campos geográficos, preview + subida de avatar, eliminación de cuenta con confirmación SweetAlert2
- [x] **`ProfileService`** — `avatarUrl$` (BehaviorSubject reactivo), `uploadAvatar()`, `deleteAccount()`, `resolveUrl()`, `clearAvatar()`
- [x] **`UserProfileDTO` / `ProfileUpdateRequest`** extendidos con nuevos campos

### 🔜 Roadmap — Próximas versiones

| Ítem | Prioridad | Descripción |
|------|-----------|-------------|
| Tests unitarios e integración | Alta | JUnit 5 + MockMvc (backend), Vitest (frontend — ya configurado en `package.json`) |
| Paginación de inscripciones admin | Media | `GET /api/admin/registrations` con filtros |
| Actualizar estado de pedidos | Media | Admin puede cambiar `PENDING → SHIPPED → DELIVERED` |
| Refresh token | Media | Renovar JWT sin re-login |
| Pasarela de pago | Media | Integración real (Stripe / PayPal) en lugar del pago simulado |
| Campo `read` en `ContactMessage` backend | Media | Marcar mensajes de contacto como leídos desde el panel admin |
| Spring Mail | Baja | Notificación por email al enviar mensaje de contacto |
| Módulo `results/` | Baja | Tiempos y clasificaciones de carrera por evento |
| Docker / docker-compose | Baja | Contenedores PostgreSQL + backend + frontend |
| Variables de entorno en producción | Baja | Externalizar JWT secret y DB password |
| `logback.xml` | Opcional | Rotación de ficheros de log en producción |

---

## 31. Sistema de Diseño UI — Design Tokens y CSS global

### Archivo: `src/styles.css`

Sistema de diseño centralizado con **11 secciones** que definen toda la identidad visual de CronoLimits.

#### Sección 1 — Design Tokens (`:root`)

```css
:root {
  /* Colores principales */
  --cl-primary:       #1e40af;     /* Azul CronoLimits */
  --cl-primary-dark:  #1e3a8a;
  --cl-primary-light: #3b82f6;
  --cl-accent:        #06b6d4;     /* Cyan accent */
  --cl-accent-dark:   #0891b2;

  /* Neutros */
  --cl-bg:            #ffffff;
  --cl-bg-muted:      #f1f5f9;
  --cl-text:          #1e293b;
  --cl-text-muted:    #64748b;
  --cl-border:        #e2e8f0;

  /* Semánticos */
  --cl-success:       #16a34a;
  --cl-warning:       #f59e0b;
  --cl-danger:        #dc2626;

  /* Tipografía */
  --cl-font:          'Inter', system-ui, -apple-system, sans-serif;
  --cl-radius:        .5rem;
  --cl-shadow:        0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06);
  --cl-shadow-lg:     0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px rgba(0,0,0,.05);
  --cl-transition:    .2s ease;
}
```

#### Sección 2 — Reset y Base

Reset mínimo (`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0 }`).
`body` se configura con `font-family: var(--cl-font)`, `color: var(--cl-text)`,
`background: var(--cl-bg)`, `line-height: 1.6`.

#### Sección 3 — Layout

- `.cl-container`: max-width 1200px, centrado con padding.
- `.cl-section`: padding vertical 4rem / 1.5rem.
- `.cl-grid-2`, `.cl-grid-3`, `.cl-grid-4`: CSS Grid responsive con `auto-fit`.
- `.cl-flex-center`, `.cl-flex-between`: utilidades flexbox.

#### Sección 4 — Tipografía

Escalas desde `.cl-text-4xl` (2.25rem) hasta `.cl-text-sm` (.875rem).
`.cl-heading`: bold, color `--cl-text`, margin-bottom.
`.cl-muted`: color `--cl-text-muted`.

#### Sección 5 — Botones (`cl-btn-*`)

| Clase | Uso |
|-------|-----|
| `.cl-btn` | Base: padding, border-radius, font-weight, transición |
| `.cl-btn-primary` | Azul `--cl-primary` → hover `--cl-primary-dark`, texto blanco |
| `.cl-btn-accent` | Cyan `--cl-accent` → hover `--cl-accent-dark`, texto blanco |
| `.cl-btn-outline` | Borde azul, fondo transparente → hover fondo azul, texto blanco |
| `.cl-btn-danger` | Rojo `--cl-danger` → hover oscurecido |
| `.cl-btn-sm` | Tamaño pequeño |
| `.cl-btn-lg` | Tamaño grande |
| `.cl-btn:disabled` | Opacidad 0.5, cursor not-allowed |

#### Sección 6 — Cards (`cl-card`)

`.cl-card`: fondo blanco, border-radius, sombra suave, overflow hidden.
`.cl-card-body`: padding interior.
`.cl-card:hover`: sombra amplificada con transición.

#### Sección 7 — Badges (`cl-badge-*`)

| Clase | Color |
|-------|-------|
| `.cl-badge` | Base: inline-block, font-size .75rem, padding, border-radius 9999px |
| `.cl-badge-primary` | Azul |
| `.cl-badge-success` | Verde |
| `.cl-badge-warning` | Naranja |
| `.cl-badge-danger` | Rojo |
| `.cl-badge-muted` | Gris |

#### Sección 8 — Formularios (`cl-input`, `cl-label`, `cl-form-error`)

Estilos para inputs, labels y mensajes de error con colores semánticos.
`.cl-input:focus`: borde azul + box-shadow sutil.

#### Sección 9 — Tablas (`cl-table`)

Tabla responsive con filas striped (`.cl-table-striped`) y hover. Header con fondo `--cl-bg-muted`.

#### Sección 10 — Alertas (`cl-alert-*`)

Alertas semánticas: `cl-alert-success`, `cl-alert-warning`, `cl-alert-danger`, `cl-alert-info`.
Fondo tintado, borde lateral coloreado, icono opcional.

#### Sección 11 — Utilidades

- `.cl-icon`: `width: 20px; height: 20px; vertical-align: -4px; stroke: currentColor; fill: none;` — clase para **todos los SVG inline** del proyecto.
- `.cl-sr-only`: screen reader only (accessible hidden).
- `.cl-text-center`, `.cl-text-right`, `.cl-mt-*`, `.cl-mb-*`: utilidades comunes.

### Convenciones

- **Prefijo `cl-`**: Todas las clases del sistema usan el prefijo `cl-` (CronoLimits) para evitar colisiones con librerías externas.
- **BEM simplificado**: `cl-card`, `cl-card-body`, `cl-card-header` (bloque-elemento).
- **Custom properties**: Todo color, sombra, radio y transición se consume vía variables CSS para facilitar theming.

---

## 32. Reactividad del estado de autenticación

### Problema original

El `AuthService` era 100% síncrono — almacenaba el JWT en `sessionStorage` y ofrecía métodos
como `isAuthenticated()` que leían de forma inmediata. Los componentes (`NavbarComponent`,
`HomeComponent`) llamaban a estos métodos **una sola vez** en `ngOnInit()`.

**Consecuencia**: Tras hacer login en `LoginComponent` y navegar a otra ruta, el navbar (ya
montado) seguía mostrando "Iniciar sesión / Registrarse" porque nunca se le notificó del cambio.

### Solución implementada (v3.1)

#### 1. `AuthService` — `BehaviorSubject<boolean>`

```typescript
// auth.service.ts
private readonly _authState$ = new BehaviorSubject<boolean>(this._checkAuth());
readonly authState$ = this._authState$.asObservable();

// _checkAuth() decodifica el JWT de sessionStorage sin depender de _authState$
// (evita referencia circular en el constructor del BehaviorSubject).

private _saveToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token);
  this._authState$.next(true);   // ← todos los suscriptores se actualizan
}

logout(): void {
  sessionStorage.removeItem(TOKEN_KEY);
  this._authState$.next(false);  // ← todos los suscriptores se actualizan
}
```

#### 2. `NavbarComponent` — suscripción reactiva

```typescript
// navbar.ts
ngOnInit(): void {
  this.authService.authState$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => this.refreshAuthState());
}

refreshAuthState(): void {
  this.isAuthenticated = this.authService.isAuthenticated();
  this.isAdmin         = this.authService.isAdmin();
  this.username        = this.authService.getCurrentUsername();
  this.initials        = this.username?.slice(0, 2).toUpperCase() ?? '?';
}
```

El `BehaviorSubject` emite el valor actual al suscribirse (reemplaza la lectura inicial en
`ngOnInit`) y emite de nuevo en cada login/logout → la UI se actualiza sin recargar.

#### 3. `HomeComponent` — suscripción reactiva

```typescript
// home.component.ts
ngOnInit(): void {
  this.authService.authState$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.username = this.authService.getCurrentUsername();
    });
  this.loadUpcomingEvents();
}
```

### Componentes que usan lectura imperativa (aceptable)

| Componente | Contexto | Por qué es aceptable |
|------------|----------|---------------------|
| `EventDetailComponent.register()` | Click del usuario | Se lee el estado en el momento de la acción, no en init |
| `authGuard` / `adminGuard` | Navegación | Se ejecuta cada vez que el usuario navega a una ruta protegida |
| `authInterceptor` | Cada petición HTTP | Se lee el token justo antes de enviar la request |

### Auditoría de loading states (v3.1)

Se auditaron **23 componentes**. Resultado:

| Estado | Componentes |
|--------|------------|
| Loading correcto (next + error) | 19 / 23 |
| Sin flag loading (admin CRUD actions) | 3 / 23 — aceptable (operaciones instantáneas) |
| Fix aplicado (login `complete` → `next`) | 1 / 23 — `LoginComponent` corregido |

### Fix `LoginComponent` — loading state

```typescript
// ANTES (podía quedarse atascado si router.navigateByUrl() fallaba)
next: () => { this.router.navigateByUrl(returnUrl); },
complete: () => { this.loading = false; }

// DESPUÉS (siempre se desactiva el loading antes de navegar)
next: () => { this.loading = false; this.router.navigateByUrl(returnUrl); }
```

### Fix `CartComponent` — memory leak

```typescript
// ANTES (suscripción sin cleanup)
ngOnInit(): void {
  this.cartService.items$.subscribe(items => this.items = items);
}

// DESPUÉS (con takeUntil para evitar fugas de memoria)
private destroy$ = new Subject<void>();
ngOnInit(): void {
  this.cartService.items$.pipe(takeUntil(this.destroy$)).subscribe(items => this.items = items);
}
ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
```

---

## 35. Frontend Angular — RegistrationWizardComponent

**Ruta**: `/events/:id/register` · `canActivate: [authGuard]`  
**Archivo**: `features/registrations/registration-wizard/registration-wizard.component.ts`

Asistente de inscripción en **4 pasos** que reemplaza al antiguo `EventRegistrationComponent`. Implementa `OnInit` y `OnDestroy` con patrón `Subject<void>`.

### Pasos del wizard

| Paso | Etiqueta | Contenido |
|------|----------|-----------|
| 1 | **Tus datos** | Carga el perfil del usuario autenticado via `ProfileService.getProfile()`. Muestra nombre, apellido y email. |
| 2 | **Evento** | Carga `EventDTO` via `EventService.getEventById(id)`. Formulario reactivo con talla de camiseta (`XS`…`XXL`), club, dorsal preferido y aceptación de términos. |
| 3 | **Equipamiento** | Cross-sell: carga entre 0 y N productos sugeridos según el tipo de deporte del evento (`getSuggestedCategories(sportType)`). Botón "Añadir al carrito" → `CartService.addProduct(product)`. |
| 4 | **Confirmación** | Llama a `RegistrationService.register(eventId)`. Si OK → muestra `RegistrationDTO` con número de dorsal y opción de redirigir a `/my-registrations` o `/shop`. |

### Cross-sell por deporte

```typescript
function getSuggestedCategories(sportType: string): string[] {
  const map: Record<string, string[]> = {
    TRAIL:      ['CALZADO', 'EQUIPAMIENTO'],
    RUNNING:    ['CALZADO', 'CAMISETAS'],
    CICLISMO:   ['EQUIPAMIENTO', 'ACCESORIOS'],
    TRIATLON:   ['EQUIPAMIENTO', 'CAMISETAS'],
    NATACION:   ['EQUIPAMIENTO', 'ACCESORIOS'],
    MONTANISMO: ['CALZADO', 'EQUIPAMIENTO'],
  };
  return map[sportType?.toUpperCase()] ?? [];
}
```

### Estado del componente

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `currentStep` | `number` | Paso activo (1–4) |
| `totalSteps` | `4` | Total de pasos del wizard |
| `stepLabels` | `string[]` | Etiquetas del progreso visual |
| `profile` | `UserProfileDTO \| null` | Datos del usuario (paso 1) |
| `event` | `EventDTO \| null` | Datos del evento (paso 2) |
| `athleteForm` | `FormGroup` | talla, club, dorsal, términos (paso 2) |
| `suggestedProducts` | `ProductDTO[]` | Productos sugeridos (paso 3) |
| `addedToCartIds` | `Set<number>` | IDs ya añadidos al carrito (badge) |
| `registrationResult` | `RegistrationDTO \| null` | Resultado final (paso 4) |
| `submitting` | `boolean` | Bloqueia botón durante llamada API |

---

## 36. Frontend Angular — AdminEventDetailComponent

**Ruta**: `/admin/events/:id` · `canActivate: [adminGuard]`  
**Archivo**: `features/admin/events/admin-event-detail.component.ts`

Vista de detalle de un evento desde el panel de administración. Tiene 3 pestañas navegables.

### Pestañas

| Pestaña | Valor `activeTab` | Contenido |
|---------|-------------------|-----------|
| **Resumen** | `'overview'` | Nombre, fecha, ubicación, deporte, aforo, precio, estado. Cargado via `AdminService.getEvent(eventId)`. |
| **Inscripciones** | `'registrations'` | Tabla de `EventRegistrationAdminDTO[]` cargada via `AdminService.getEventRegistrations(eventId)`. Filtros: estado (todas/activas/canceladas) + búsqueda por nombre o email. Botón **Exportar CSV** → `AdminService.downloadCSV()`. |
| **Pagos** | `'payments'` | Sección informativa — endpoint `GET /api/admin/events/{id}/orders` pendiente de implementar en backend. |

### Modelos utilizados

#### `EventRegistrationAdminDTO`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `number` | ID de la inscripción |
| `userId` | `number` | ID del usuario |
| `username` | `string` | Username |
| `userEmail` | `string` | Email del usuario |
| `userName` | `string` | Nombre |
| `userLastname` | `string` | Apellido |
| `bibNumber?` | `string` | Dorsal asignado |
| `registrationDate` | `string` | ISO 8601 |
| `paymentStatus` | `'PENDING' \| 'PAID' \| 'REFUNDED'` | Estado del pago |
| `cancelled` | `boolean` | Si la inscripción está cancelada |
| `cancelledAt?` | `string` | Fecha de cancelación |
| `talla?` | `string` | Talla de camiseta |
| `club?` | `string` | Club del participante |

#### `EventPaymentAdminDTO`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `orderId` | `number` | ID del pedido |
| `username` | `string` | Username del comprador |
| `userEmail` | `string` | Email |
| `createdAt` | `string` | Fecha de creación |
| `totalAmount` | `number` | Importe total |
| `status` | `string` | Estado del pedido |

### Flujo de carga

```
ngOnInit → loadEvent() → AdminService.getEvent(eventId) → EventDTO
Clic pestaña "Inscripciones" → loadRegistrations() → AdminService.getEventRegistrations(eventId) → EventRegistrationAdminDTO[]
(lazy: solo se carga una vez; segunda vez usa caché en componente)
```

---

## 33. Historial de cambios — Changelog

### v5.0 — Mayo 2026

| Archivo | Cambio |
|---------|--------|
| `FormQuestion.java` | `event` cambiado a `optional=true`, `nullable=true` |
| `FormQuestionRepository.java` | 3 nuevos métodos para banco global |
| `FormQuestionService.java` | 5 nuevos métodos de banco |
| `FormQuestionServiceImpl.java` | Implementación de los 5 métodos de banco |
| `FormQuestionController.java` | 5 nuevos endpoints `/api/admin/question-bank` |
| `FormTemplate.java` | Nueva entidad — tabla `form_templates` |
| `FormTemplateQuestion.java` | Nueva entidad — tabla `form_template_questions` |
| `FormTemplateRepository.java` | Nuevo repositorio con 2 queries |
| `FormTemplateDTO.java / FormTemplateQuestionDTO.java / FormTemplateRequest.java` | Nuevos DTOs |
| `FormTemplateService.java / FormTemplateServiceImpl.java` | Nuevo servicio completo |
| `FormTemplateController.java` | 8 nuevos endpoints `/api/admin/form-templates` |
| `form-question.ts` | Añadidos `FormTemplateDTO`, `FormTemplateQuestionDTO`, `FormTemplateRequest` |
| `form-builder.service.ts` | Métodos banco (5) + plantillas (3) |
| `admin-form-builder.component.ts` | Pestaña Banco, `saveAsTemplate()`, `applyTemplate()` |
| `admin-form-builder.component.html` | Pestaña Banco en catálogo, botones de plantilla; eliminado card "Nueva pregunta" y botón "Añadir bloque" |
| `admin-form-builder.component.css` | Estilos `.fb-catalog-item--bank`, `.fb-template-actions` |
| `question-bank.component.ts/html/css` | Nuevo componente CRUD `/admin/question-bank` |
| `app.routes.ts` | Ruta `/admin/question-bank`; eliminada ruta `bibs`; corregido `5-user-app` → `cronolimits-frontend` |
| `admin-event-sidebar.component.html` | Eliminado enlace Dorsales |
| `admin-event-detail.component.html` | Eliminado botón Dorsales |
| `admin-participants.component.html` | Eliminadas columnas Dorsal/Chip, filtros y estadísticas |
| `angular.json` | Corregido `buildTarget` de `5-user-app` a `cronolimits-frontend` |
| `amplify.yml` | Nuevo — build spec para AWS Amplify con inyección de variables |
| `buildspec.yml` | Nuevo — build spec para AWS CodeBuild |
| `DOCUMENTACION_PROYECTO.md` | Bumped a v5.0, secciones 3/30/33 actualizadas |

---

### v5.1 — Mayo 2026

#### Admin — UX: eliminación de botones "Volver al evento" redundantes

Los componentes de gestión de evento (participantes, formulario de inscripción, dorsales) ya están
envueltos por el `AdminEventLayoutComponent`, que proporciona un topbar contextual con botón de
retroceso. El breadcrumb adicional "Volver al evento" dentro de cada subcomponente era redundante
y generaba ruido visual.

| Componente | Cambio |
|------------|--------|
| `admin-participants.component.html` | Eliminado bloque `<div class="ap-breadcrumb">` con enlace "Volver al evento" |
| `admin-bibs.component.html` | Eliminado bloque `<div class="ab-breadcrumb">` con enlace "Volver al evento" |
| `admin-form-builder.component.html` | Eliminado bloque `<div class="fb-breadcrumb">` con enlace "Volver al evento" |
| `admin-bibs.component.ts` | `RouterLink` eliminado de `imports` y del `import` estático — ya no se usa en el template |
| `admin-form-builder.component.ts` | `RouterLink` eliminado de `imports` y del `import` estático |
| `admin-participants.component.ts` | `RouterLink` eliminado de `imports` y del `import` estático |

#### Admin — UX: títulos más grandes en subcomponentes de evento

Los títulos de página en las vistas de administración de evento eran visualmente pequeños comparados
con el resto de la interfaz. Se han incrementado los tamaños de fuente para mejorar la jerarquía
tipográfica.

| Selector CSS | Archivo | Antes | Después |
|--------------|---------|-------|---------|
| `.ap-page-title` | `admin-participants.component.css` | `1.5rem` | `1.85rem` |
| `.ap-drawer__title` | `admin-participants.component.css` | `1.1rem` | `1.25rem` |
| `.fb-page-title` | `admin-form-builder.component.css` | `1.45rem` | `1.85rem` |
| `.ab-page-title` | `admin-bibs.component.css` | `1.5rem` | `1.85rem` |

#### Admin — Editar participante: eliminados campos no implementados

El formulario de edición de participante (drawer lateral en la vista de participantes) mostraba
campos que aún no tienen soporte en backend ni en la lógica de negocio actual.

| Campo eliminado | Motivo |
|-----------------|--------|
| **Chip de cronometraje** (`chipCode`) | Sin implementación en el flujo actual; el chip se gestiona desde la sección de dorsales (`admin-bibs`) |

#### Admin — Detalles de inscripción: eliminado campo "Localizador"

El localizador (código interno de 8 caracteres) es un identificador interno de base de datos y no
aporta valor al flujo actual de administración ni al usuario final.

| Vista | Cambio |
|-------|--------|
| `registration-detail.component.html` (usuario) | Eliminado `@if (registration.locator)` y el ítem "Localizador" de la barra de resaltado. La barra ahora solo muestra el dorsal si está asignado |
| `event-registration-form.component.html` (pantalla de éxito) | Eliminados ítems "Localizador" (`result.locator`) y "Chip" (`result.chipCode`) de la pantalla de confirmación |

#### Backend — Borrado diferido de inscripciones canceladas (24 h)

Hasta esta versión, al cancelar una inscripción esta quedaba con `cancelled=true` pero nunca se
eliminaba físicamente (borrado lógico permanente). Se implementa un ciclo de vida completo:

1. Usuario/admin cancela → `cancelled=true`, `cancelledAt=now()`.
2. La inscripción permanece visible en estado **Cancelada** durante un máximo de **24 horas**.
3. Un job programado (cada hora) borra físicamente todas las inscripciones cuyo `cancelledAt`
   sea anterior a `now() - 24 h`.

**Archivos nuevos/modificados**

| Archivo | Tipo | Detalle |
|---------|------|---------|
| `registrations/repositories/RegistrationRepository.java` | Modificado | Añadido import `LocalDateTime`; nueva query `findCancelledBefore(@Param("cutoff") LocalDateTime)` con JPQL |
| `registrations/services/CancelledRegistrationCleanupJob.java` | **Nuevo** | `@Component` + `@Scheduled(cron = "0 0 * * * *")` — purga cada hora. Log INFO por cada registro eliminado |

**Comportamiento del job**

```
[REG-CLEANUP] Eliminando 3 inscripción(es) cancelada(s) con ventana expirada (cutoff=2026-05-11T10:00:00)
[REG-CLEANUP] Eliminando inscripción id=42, usuario='maria', evento='Trail Serra d'Albarracín'
```

- Requiere `@EnableScheduling` en `CronolimitsBackendApplication` (ya presente desde versiones anteriores).
- Si no hay registros que purgar → log `DEBUG` para no saturar logs de producción.
- Errores de base de datos en la purga se capturan con `log.error` y no interrumpen el servidor.

#### Frontend — Mensajes de cancelación actualizados

Los diálogos SweetAlert2 de confirmación y éxito en la cancelación de inscripciones ahora informan
al usuario del período de retención de 24 horas.

| Archivo | Cambio |
|---------|--------|
| `my-registrations.component.ts` | Texto de confirmación: "La inscripción quedará en estado cancelado y se eliminará automáticamente en un plazo máximo de 24 horas" |
| `my-registrations.component.ts` | Texto de éxito: "Tu inscripción ha sido cancelada. Permanecerá visible como cancelada y se eliminará en un plazo máximo de 24 horas" — timer ampliado a 3 500 ms |
| `registration-detail.component.ts` | Mismo mensaje de confirmación y de éxito actualizados |

#### Resumen de archivos modificados en v5.1

| Archivo | Tipo de cambio |
|---------|----------------|
| `admin-participants.component.html` | Eliminado breadcrumb; eliminado campo chip en formulario de edición |
| `admin-participants.component.ts` | `RouterLink` eliminado de imports |
| `admin-participants.component.css` | `.ap-page-title` 1.5→1.85rem; `.ap-drawer__title` 1.1→1.25rem |
| `admin-bibs.component.html` | Eliminado breadcrumb |
| `admin-bibs.component.ts` | `RouterLink` eliminado de imports |
| `admin-bibs.component.css` | `.ab-page-title` 1.5→1.85rem |
| `admin-form-builder.component.html` | Eliminado breadcrumb |
| `admin-form-builder.component.ts` | `RouterLink` eliminado de imports |
| `admin-form-builder.component.css` | `.fb-page-title` 1.45→1.85rem |
| `registration-detail.component.html` | Eliminados ítems Localizador y Chip de barra de resaltado |
| `registration-detail.component.ts` | Mensajes de cancelación actualizados con retención 24 h |
| `event-registration-form.component.html` | Eliminados ítems Localizador y Chip en pantalla de éxito |
| `my-registrations.component.ts` | Mensajes de cancelación actualizados con retención 24 h |
| `RegistrationRepository.java` | Import `LocalDateTime`; query `findCancelledBefore` |
| `CancelledRegistrationCleanupJob.java` | Archivo nuevo — job horario de purga de inscripciones canceladas |
| `DOCUMENTACION_PROYECTO.md` | Bumped a v5.1, changelog v5.1 añadido |

---

### v3.9 — Abril 2026

#### Seguridad — Restricción de autenticación en "Añadir al carrito"

**Problema**: Los botones "Añadir" (lista de productos) y "Añadir al carrito" (detalle de producto)
eran accesibles para usuarios no autenticados, permitiéndoles llenar el carrito y llegar al
checkout (que sí requería auth) sin ningún aviso previo.

**Estrategia aplicada — defensa en dos capas**

| Capa | Mecanismo | Qué resuelve |
|------|-----------|--------------|
| **Frontend — componentes** | `AuthDialogService.requireAuth()` antes de `cartService.addProduct()` | Bloquea la acción en el punto de interacción más temprano con UX clara (SweetAlert2 con opciones login/registro) |
| **Frontend — interceptor** | `catchError` en `authInterceptor` para respuestas 401 | Auto-logout y redirección a `/login?returnUrl=...` cuando el token expira durante una sesión activa |
| **Backend** | `POST /api/orders` ya protegido con `.authenticated()` en `SpringSecurityConfig` | Red de seguridad definitiva — un usuario sin token no puede completar ningún pedido aunque sortee el frontend |

**El carrito es en memoria (cliente)**, no existe endpoint de backend para él. La decisión de
guardarlo solo en `CartService` (BehaviorSubject) es correcta: el stock y los precios se
verifican en el momento del pedido (`POST /api/orders`), no antes.

#### Cambios en frontend

**`ProductListComponent`** (`features/shop/product-list/`):
- Inyectado `AuthDialogService` en constructor.
- `addToCart(product)` ahora llama `this.authDialog.requireAuth('/shop', () => cartService.addProduct(product))`.
- Si el usuario no está autenticado → SweetAlert2 con botones _Iniciar sesión_ / _Registrarse_ / _Cancelar_.
- Tras login exitoso, `returnUrl='/shop'` devuelve al usuario a la lista de productos.

**`ProductDetailComponent`** (`features/shop/product-detail/`):
- Inyectado `AuthDialogService` en constructor.
- Campo privado `productId` para construir `returnUrl` antes de que `product` cargue.
- `addToCart()` ahora llama `this.authDialog.requireAuth('/shop/products/{id}', () => ...)`.
- Tras login exitoso, `returnUrl` devuelve al usuario exactamente al producto que quería comprar.

**`auth.interceptor.ts`** (`core/interceptors/`):
- Añadido `catchError` para interceptar respuestas entrantes.
- En respuesta 401: `authService.logout()` + `router.navigate(['/login'], { queryParams: { returnUrl: router.url } })`.
- En respuesta 403, 422, 500: el error se propaga al componente para su gestión local.
- La variable `token` se inyecta una sola vez y se reutiliza tanto para el header saliente como para el manejo de errores entrantes.

#### Flujo completo

```
Usuario no autenticado → /shop → click "Añadir"
  → requireAuth('/shop', fn)
  → isAuthenticated() === false
  → SweetAlert2: "Acceso requerido — Iniciar sesión / Registrarse / Cancelar"
    ├─ Iniciar sesión  → /login?returnUrl=/shop
    │    └─ tras login → redirección a /shop → usuario repite la acción → ✅ producto añadido
    ├─ Registrarse     → /register?returnUrl=/shop
    └─ Cancelar        → se queda en la tienda, sin añadir nada
```

#### Archivos modificados en v3.9

| Archivo | Tipo de cambio |
|---------|----------------|
| `features/shop/product-list/product-list.component.ts` | Inyección `AuthDialogService`, `addToCart()` con `requireAuth` |
| `features/shop/product-detail/product-detail.component.ts` | Inyección `AuthDialogService`, `productId` privado, `addToCart()` con `requireAuth` |
| `core/interceptors/auth.interceptor.ts` | Añadido `catchError` para 401 → auto-logout + redirect |
| `DOCUMENTACION_PROYECTO.md` | Añadida sección changelog v3.9, versión bumped a 3.9 |

---

### v3.8 — Abril 2026

#### Bug fix — Confirmación de inscripción fallaba con error 500

**Síntoma**: Al completar el wizard de inscripción y pulsar "Confirmar inscripción", la
petición `POST /api/events/{eventId}/registrations` siempre devolvía un error 500
("Error interno del servidor"), haciendo imposible inscribirse a cualquier evento.

**Causa raíz — `Registration.java` / columna `terms_accepted`**

El campo `termsAccepted` fue añadido como columna de base de datos en la versión v2
con la anotación:
```java
@Column(nullable = false)
private boolean termsAccepted = false;
```
Con `spring.jpa.hibernate.ddl-auto=update`, Hibernate genera automáticamente el DDL:
```sql
ALTER TABLE registrations ADD COLUMN terms_accepted boolean NOT NULL;
```
PostgreSQL **rechaza este ALTER** si la tabla ya contiene filas (de inscripciones de prueba
hechas antes de v2) porque no puede asignar un valor a las filas existentes. El error DDL
ocurre silenciosamente al arrancar la aplicación, la columna **no se crea**, y cada INSERT
posterior falla con:
```
ERROR: column "terms_accepted" of relation "registrations" does not exist
```
Esto se traduce en un 500 al cliente y en el frontend muestra "Error al procesar la inscripción."

**Fix aplicado — `Registration.java`**

Añadida la cláusula `DEFAULT false` en el `columnDefinition` para que el ALTER funcione
incluso sobre tablas con filas existentes:
```java
@Column(nullable = false, columnDefinition = "boolean NOT NULL DEFAULT false")
private boolean termsAccepted = false;
```
Ahora Hibernate emite:
```sql
ALTER TABLE registrations ADD COLUMN terms_accepted boolean NOT NULL DEFAULT false;
```
PostgreSQL acepta el comando, rellena `false` en todas las filas existentes y el INSERT
de nuevas inscripciones funciona correctamente.

**Mejora secundaria — `registration-wizard.component.ts`** (frontend)

El bloque `error:` del `subscribe()` en `confirm()` solo recuperaba `err?.error?.message`.
Si el backend respondía un 500 sin cuerpo (o con cuerpo que no fuera `ApiError`), el mensaje
que veía el usuario era el genérico "Error al procesar la inscripción." en lugar del código HTTP.

Actualizado para mostrar también el código HTTP cuando no hay mensaje de texto:
```typescript
const backendMsg: string | undefined = err?.error?.message;
const httpMsg = err?.status ? `Error ${err.status}: ${err?.statusText ?? 'Error del servidor'}` : null;
this.registrationError = backendMsg ?? httpMsg ?? 'Error al procesar la inscripción.';
```

#### Archivos modificados en v3.8

| Archivo | Tipo de cambio |
|---------|----------------|
| `registrations/entities/Registration.java` | `@Column(nullable=false, columnDefinition="boolean NOT NULL DEFAULT false")` en `termsAccepted` |
| `features/registrations/registration-wizard/registration-wizard.component.ts` | Error handler mejorado con código HTTP en fallback |
| `DOCUMENTACION_PROYECTO.md` | Añadida entrada changelog v3.8, versión bumped a 3.8 |

---

### v3.7 — Abril 2026

#### Backend — Extensión de `User` y `ProfileController` (RGPD / perfil avanzado)

| Cambio | Detalle |
|--------|---------|
| **`User.java` — campos adicionales** | Añadidos `province` (`String`, nullable), `country` (`String`, nullable), `phone` (`String`, nullable), `avatarUrl` (`String`, nullable), `enabled` (`boolean`, `@Column nullable=false`, default `true`) y `privacyAcceptedAt` (`LocalDateTime`, nullable — fecha de aceptación RGPD). |
| **`ProfileUpdateRequest.java` — campos adicionales** | Añadidos `province?`, `country?` y `phone?`. El campo `phone` lleva `@Pattern(regexp = "^(\\+[0-9]{1,4}[0-9]{7,15})?$")` para validar formato E.164 (o vacío). |
| **`ProfileController` — `PUT /api/users/me`** | Actualizado para persistir también `province`, `country` y `phone` cuando se actualizan. |
| **`ProfileController` — `POST /api/users/me/avatar`** | Nuevo endpoint `multipart/form-data` con campo `"file"`. Valida tipo MIME `image/*` y guarda en `uploads/avatars/{userId}.{ext}`. Actualiza `avatarUrl` del usuario y devuelve `UserResponse` con URL relativa. |
| **`ProfileController` — `DELETE /api/users/me`** | Nuevo endpoint RGPD HU-11. Realiza borrado lógico con anonimización completa de PII: nombre → `"Cuenta"`, apellido → `"Eliminada"`, email → `deleted.{id}@cl.local`, username → `del{id}` (máx. 12 chars), contraseña reemplazada con BCrypt de UUID aleatorio (irrecuperable), phone/province/country/avatarUrl → `null`, `enabled = false`. Las FK de inscripciones y pedidos quedan intactas. |
| **`UserResponse.java`** | Añadidos campos `province`, `country`, `phone` y `avatarUrl` al DTO de salida para exponerlos correctamente en las respuestas de perfil. |
| **`application.properties`** | Nueva propiedad `app.upload-dir=uploads/avatars` que configura el directorio de almacenamiento de avatares (inyectada con `@Value` en `ProfileController`). |

#### Backend — `RegisterRequest.java` (RGPD / datos adicionales en registro)

| Cambio | Detalle |
|--------|---------|
| **Campos adicionales** | Añadidos `province`, `country` y `phone` (todos `@NotBlank` o `@Pattern` según corresponda). |
| **`acceptedPrivacyPolicy`** | Nuevo campo booleano `@AssertTrue` — el usuario debe marcar explícitamente que acepta la política de privacidad. BV lanza `400` si es `false`. |

#### Frontend — `RegisterComponent` (datos adicionales + política de privacidad)

| Cambio | Detalle |
|--------|---------|
| **Nuevos campos del formulario** | `province` (`required`), `country` (`required`), `phonePrefix` (selector `+34` por defecto), `phoneNumber` (`required`, `phoneNumberValidator` 7-15 dígitos). |
| **`acceptedPrivacyPolicy`** | Checkbox `required` + validador `Validators.requiredTrue` — el formulario no se puede enviar sin aceptar la política. |
| **Validadores personalizados** | `passwordStrengthValidator` (≥1 mayúscula, ≥1 minúscula, ≥1 dígito), `usernamePatternValidator` (sólo `[a-zA-Z0-9_]`), `passwordMatchValidator` (confirma que password === confirmPassword), `phoneNumberValidator`. |
| **`geo.constants.ts`** | Nuevo archivo `core/constants/geo.constants.ts` con constantes `SPAIN_PROVINCES: string[]` (52 provincias), `COUNTRIES: Country[]` (lista internacional) y `PHONE_PREFIXES: PhonePrefix[]` (prefijos internacionales). Consumido por `RegisterComponent` y `ProfileComponent`. |
| **`returnUrl` tras registro** | Al registrarse y hacer auto-login exitoso, navega a `returnUrl` (leído de `ActivatedRoute`) en lugar de siempre a `/home`. |

#### Frontend — `ProfileComponent` (perfil avanzado + avatar + eliminación de cuenta)

| Cambio | Detalle |
|--------|---------|
| **Nuevos campos del formulario** | `province`, `country`, `phonePrefix`, `phoneNumber` (opcionales en perfil). El campo `username` se muestra deshabilitado. |
| **Avatar upload** | Selector de fichero `<input type="file" accept="image/*">`. Validaciones en cliente: solo imágenes, max 5 MB. Preview inmediato con `FileReader`. Botón "Subir avatar" llama a `ProfileService.uploadAvatar()`. |
| **Eliminación de cuenta (RGPD HU-11)** | Botón "Eliminar cuenta" con confirmación SweetAlert2. Llama a `ProfileService.deleteAccount()`. En la ejecución: llama a `AuthService.logout()` y `ProfileService.clearAvatar()` antes del diálogo de éxito, luego navega a `/home`. |
| **`roleLabels`** | Getter que mapea `ROLE_ADMIN` → `"Administrador"`, `ROLE_USER` → `"Usuario"`. |
| **`splitPhone()`** | Helper privado que separa el prefijo del número en un string E.164. |

#### Frontend — `ProfileService` (reactive avatar stream)

| Cambio | Detalle |
|--------|---------|
| **`avatarUrl$`** | `BehaviorSubject<string \| null>` interno expuesto como `Observable`. Emite la URL absoluta del avatar cada vez que se carga el perfil, se actualiza el perfil o se sube un nuevo avatar. |
| **`uploadAvatar(file)`** | `POST /api/users/me/avatar` multipart. Normaliza la URL y emite en `avatarUrl$`. |
| **`deleteAccount()`** | `DELETE /api/users/me`; devuelve `{ message: string }`. |
| **`resolveUrl(url?)`** | Convierte rutas relativas `/uploads/...` en URL absolutas. Público para uso en template. |
| **`clearAvatar()`** | Emite `null` en `avatarUrl$`; llamado en `logout()`. |
| **`normalizeProfile()`** | Método privado que aplica `resolveUrl` al `avatarUrl` de cualquier `UserProfileDTO`. Aplicado en `getProfile()`, `updateProfile()` y `uploadAvatar()`. |

#### Archivos modificados/creados en v3.7

| Archivo | Tipo de cambio |
|---------|----------------|
| `users/entities/User.java` | Añadidos `province`, `country`, `phone`, `avatarUrl`, `enabled`, `privacyAcceptedAt` |
| `users/models/ProfileUpdateRequest.java` | Añadidos `province`, `country`, `phone` con validaciones |
| `users/models/UserResponse.java` | Añadidos `province`, `country`, `phone`, `avatarUrl` |
| `users/models/RegisterRequest.java` | Añadidos `province`, `country`, `phone`, `acceptedPrivacyPolicy` |
| `users/controllers/ProfileController.java` | Nuevos endpoints `/avatar` (POST) y `/me` (DELETE); PUT actualizado |
| `resources/application.properties` | Añadida propiedad `app.upload-dir` |
| `core/constants/geo.constants.ts` | Archivo nuevo — `SPAIN_PROVINCES`, `COUNTRIES`, `PHONE_PREFIXES` |
| `core/models/auth.model.ts` | `RegisterRequest`, `UserResponse`, `UserProfileDTO`, `ProfileUpdateRequest` extendidos |
| `core/services/profile.service.ts` | Añadidos `avatarUrl$`, `uploadAvatar()`, `deleteAccount()`, `resolveUrl()`, `clearAvatar()` |
| `features/auth/register/register.component.ts` | Campos nuevos, validadores, `returnUrl` |
| `features/auth/register/register.component.html` | Campos province/country/phone/privacy + confirmPassword + validaciones inline |
| `features/profile/profile.component.ts` | Avatar upload, eliminación de cuenta, campos geográficos, `roleLabels`, `splitPhone()` |
| `features/profile/profile.component.html` | Sección avatar, campos province/country/phone, botón eliminación |
| `DOCUMENTACION_PROYECTO.md` | Añadida sección 37, changelog v3.7, versión bumped a 3.7 |

---

## 37. Frontend Angular — ProfileComponent (perfil avanzado)

**Ruta**: `/profile` · `canActivate: [authGuard]`  
**Archivo**: `features/profile/profile.component.ts`

Página de perfil extendida con soporte para datos geográficos, teléfono, foto de perfil y eliminación de cuenta siguiendo las directrices RGPD.

### Campos del formulario

| Campo | Validators | Notas |
|-------|-----------|-------|
| `name` | `required`, `minLength(2)`, `pattern(namePattern)` | Unicode (/u flag) — letras, espacios, guión, apóstrofo |
| `lastname` | `required`, `minLength(2)`, `pattern(namePattern)` | Igual que `name` |
| `email` | `required`, `email` | Único en BD |
| `username` | — | `disabled` — de solo lectura |
| `province` | — | Selector con `SPAIN_PROVINCES` (52 provincias) |
| `country` | — | Selector con `COUNTRIES` |
| `phonePrefix` | — | Selector con `PHONE_PREFIXES` (default `+34`) |
| `phoneNumber` | `phoneNumberValidator` | Solo dígitos, 7-15 caracteres; vacío permitido |

Al guardar, `phone` se envía concatenado: `${phonePrefix}${phoneNumber.trim()}`.

### Sección avatar

| Propiedad / método | Descripción |
|--------------------|-------------|
| `avatarPreview` | `string \| null` — URL local (FileReader) o URL del servidor |
| `avatarFile` | `File \| null` — archivo seleccionado pendiente de subir |
| `avatarUploading` | `boolean` — bloquea el botón "Subir avatar" |
| `avatarError` | `string` — mensaje de error del proceso de subida |
| `avatarSuccess` | `string` — confirmación de subida correcta |
| `onAvatarChange(event)` | Valida tipo MIME y tamaño (<= 5 MB), genera preview con `FileReader` |
| `uploadAvatar()` | Llama a `ProfileService.uploadAvatar(avatarFile)` |

### Eliminación de cuenta (RGPD HU-11)

```typescript
async onDeleteAccountClick(): Promise<void>
```

1. Muestra diálogo de confirmación SweetAlert2 con botón rojo "Eliminar definitivamente".
2. Si confirmado → `ProfileService.deleteAccount()`.
3. En `next()`: llama a `AuthService.logout()` + `ProfileService.clearAvatar()` → estado de auth desactivado antes del Swal de éxito.
4. Tras cerrar el Swal de éxito → navega a `/home`.
5. `allowOutsideClick: false` y `allowEscapeKey: false` evitan navegación prematura sin pulsar Aceptar.

### Getters helper

| Getter / método | Descripción |
|-----------------|-------------|
| `roleLabels` | Mapea `['ROLE_ADMIN','ROLE_USER']` → `['Administrador','Usuario']` para mostrar al usuario |
| `splitPhone(fullPhone)` | Separa el prefijo del número en un string E.164 contra `PHONE_PREFIXES` |
| `field(name)` | Atajo a `this.form.get(name)!` |
| `isInvalid(name)` | `c.invalid && (c.dirty \|\| c.touched)` |

### Estado del componente

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `loading` | `boolean` | Spinner mientras se carga el perfil en `ngOnInit` |
| `saving` | `boolean` | Deshabilita el botón "Guardar" durante el POST |
| `deletingAccount` | `boolean` | Deshabilita el botón "Eliminar cuenta" durante la llamada DELETE |
| `successMsg` | `string` | Mensaje de confirmación de guardado |
| `apiError` | `string` | Mensaje de error del backend (400/409/422/5xx) |
| `profile` | `UserProfileDTO \| null` | Datos del perfil cargados |

### v3.6 — Abril 2026

#### Frontend — Mostrar/ocultar contraseña en Login y Registro

| Cambio | Detalle |
|--------|---------|
| **`LoginComponent` — `showPassword`** | Nueva propiedad booleana `showPassword = false` y método `togglePasswordVisibility()` que alterna su valor. |
| **`LoginComponent` — binding de tipo dinámico** | El campo de contraseña usa `[type]="showPassword ? 'text' : 'password'"` en lugar de `type="password"` fijo. |
| **`LoginComponent` — botón icono SVG** | Añadido `<button type="button" class="toggle-password-btn">` dentro de un `.password-wrapper` relativo. Muestra SVG de ojo abierto (contraseña oculta) o ojo tachado (contraseña visible). Atributos `aria-label` y `aria-pressed` para accesibilidad. |
| **`RegisterComponent` — `showPassword` y `showConfirmPassword`** | Dos propiedades booleanas independientes para controlar cada campo por separado. Métodos `togglePasswordVisibility()` y `toggleConfirmPasswordVisibility()`. |
| **`RegisterComponent` — campos password y confirmPassword** | Mismo patrón `.password-wrapper` + botón icono SVG en ambos campos. SVG inline para ojo abierto/tachado. |
| **CSS compartido (login y register)** | Nuevas clases `.password-wrapper` (posición relativa), `.toggle-password-btn` (posición absoluta a la derecha, sin borde ni fondo) y `.toggle-password-btn svg` (tamaño 1.15rem). Los estados `:hover` y `:focus-visible` usan `var(--cl-primary)` y `outline` accesible. El `<input>` recibe `padding-right: 2.75rem` para no solaparse con el icono. |

#### Backend — Corrección `ProfileController` — 409 email duplicado

| Cambio | Detalle |
|--------|---------|
| **`ProfileController.updateProfile()` — 409 consistente** | El bloque que devolvía `ResponseEntity.status(409).body(Collections.singletonMap(...))` reemplazado por `throw new UserAlreadyExistsException("...")`. El `GlobalExceptionHandler` lo transforma en `ApiError` estándar (mismo formato JSON que el resto de errores de la API). |
| **Import `Collections` eliminado** | Ya no se usa `java.util.Collections` en `ProfileController`. Import eliminado para mantener el fichero limpio. |

#### Frontend — Corrección `ProfileComponent` — manejo de errores al guardar perfil

| Cambio | Detalle |
|--------|---------|
| **`form.markAllAsTouched()` en error** | El callback `error` del `onSubmit()` ahora llama a `this.form.markAllAsTouched()` para que los campos inválidos se resalten en rojo al recibir un 400 del backend. |
| **Desglose de códigos HTTP en el handler de error** | Separados los casos 409 (email duplicado), 400 (validación `@Valid`), 422 (regla de negocio) y fallback 5xx, cada uno con un mensaje de usuario descriptivo y lectura de `apiErr?.message`. Antes, 409 y 400 compartían el mismo bloque y los errores 422 caían al genérico. |
| **Limpieza de mensajes al iniciar submit** | `successMsg` y `apiError` se limpian a `''` al inicio de cada llamada a `onSubmit()`, evitando que mensajes de intentos anteriores permanezcan visibles durante la nueva petición. |

#### Archivos modificados en v3.6

| Archivo | Tipo de cambio |
|---------|----------------|
| `features/auth/login/login.component.ts` | Añadido `showPassword`, `togglePasswordVisibility()` |
| `features/auth/login/login.component.html` | Campo contraseña con `[type]` dinámico y botón SVG de ojo |
| `features/auth/login/login.component.css` | Nuevas clases `.password-wrapper`, `.toggle-password-btn` |
| `features/auth/register/register.component.ts` | Añadidos `showPassword`, `showConfirmPassword` y métodos toggle |
| `features/auth/register/register.component.html` | Campos password y confirmPassword con `[type]` dinámico y botón SVG de ojo |
| `features/auth/register/register.component.css` | Mismas clases CSS que login para consistencia visual |
| `users/controllers/ProfileController.java` | 409 email duplicado → `throw new UserAlreadyExistsException`; import `Collections` eliminado |
| `features/profile/profile.component.ts` | `markAllAsTouched()` en error; desglose 400/409/422; limpieza de mensajes al submit |
| `DOCUMENTACION_PROYECTO.md` | Añadida entrada changelog v3.6, versión bumped a 3.6 |

---

### v3.5 — Abril 2026

#### Frontend — `RegistrationWizardComponent` (nuevo)

| Cambio | Detalle |
|--------|---------|
| **`RegistrationWizardComponent`** | Nuevo componente en `features/registrations/registration-wizard/`. Reemplaza `EventRegistrationComponent`. Wizard de 4 pasos: Tus datos → Evento → Equipamiento (cross-sell) → Confirmación. |
| **Cross-sell por deporte** | Función `getSuggestedCategories(sportType)` mapea tipo de deporte a categorías de productos recomendados. Los productos se añaden al carrito directamente desde el wizard. |
| **`athleteForm`** | Formulario reactivo en el paso 2 para talla de camiseta, club, dorsal preferido y aceptación de términos. |
| **Ruta actualizada** | `/events/:id/register` → `RegistrationWizardComponent` (antes `EventRegistrationComponent`). |

#### Frontend — `AdminEventDetailComponent` (nuevo)

| Cambio | Detalle |
|--------|---------|
| **`AdminEventDetailComponent`** | Nuevo componente en `features/admin/events/`. Ruta `/admin/events/:id`. Vista de detalle de evento para admins con 3 pestañas navegables. |
| **Pestaña Resumen** | Carga `EventDTO` via `AdminService.getEvent(eventId)`. Muestra todos los datos del evento. |
| **Pestaña Inscripciones** | Carga `EventRegistrationAdminDTO[]` via `AdminService.getEventRegistrations(eventId)`. Filtros de estado y búsqueda por texto. |
| **Exportación CSV** | `AdminService.downloadCSV(rows, filename)` genera y descarga el CSV de inscripciones en el navegador sin necesidad de endpoint backend. |
| **Pestaña Pagos** | Informativa — endpoint backend `/api/admin/events/{id}/orders` pendiente de implementar. |

#### Frontend — Nuevos modelos en `admin.model.ts`

| Cambio | Detalle |
|--------|---------|
| **`EventRegistrationAdminDTO`** | DTO para la pestaña Inscripciones de `AdminEventDetailComponent`. Incluye datos del participante: username, email, nombre, apellido, dorsal, talla, club, estado de pago y cancelación. |
| **`EventPaymentAdminDTO`** | DTO para la pestaña Pagos (preparado para cuando se implemente el endpoint backend de pagos por evento). |

#### Frontend — Nuevos métodos en `AdminService`

| Cambio | Detalle |
|--------|---------|
| **`getEventRegistrations(eventId)`** | `GET /api/admin/events/{id}/registrations` → `EventRegistrationAdminDTO[]`. |
| **`getEvent(eventId)`** | `GET /api/events/{id}` reutilizado desde el servicio admin para centralizar las llamadas al backend. |
| **`downloadCSV(rows, filename)`** | Método cliente — genera un blob CSV con BOM UTF-8 y lo descarga en el navegador usando `URL.createObjectURL`. |

#### Frontend — Nuevo modelo `participant.ts`

| Cambio | Detalle |
|--------|---------|
| **`ParticipantDTO`** | Nueva interfaz en `core/models/participant.ts`: `bibNumber?`, `name`, `lastnameInitial`, `club?`. Preparada para la futura vista pública de resultados. |

#### Frontend — `AdminService.ts` y restructuración admin

| Cambio | Detalle |
|--------|---------|
| **`AuthDialogService`** | Formalizado en sección 21 — ver v3.3 para detalles de implementación. |
| **Restructuración carpetas admin** | Las features admin quedan en subcarpetas: `events/`, `users/`, `dashboard/`, `products/`, `orders/`, `contact-messages/`. |
| **Ruta `/admin/events/:id` añadida** | Nueva ruta child en el admin shell para `AdminEventDetailComponent`. |

#### Archivos modificados en v3.5

| Archivo | Tipo de cambio |
|---------|----------------|
| `features/registrations/registration-wizard/registration-wizard.component.ts` | Archivo nuevo |
| `features/registrations/registration-wizard/registration-wizard.component.html` | Archivo nuevo |
| `features/registrations/registration-wizard/registration-wizard.component.css` | Archivo nuevo |
| `features/admin/events/admin-event-detail.component.ts` | Archivo nuevo |
| `features/admin/events/admin-event-detail.component.html` | Archivo nuevo |
| `features/admin/events/admin-event-detail.component.css` | Archivo nuevo |
| `core/models/participant.ts` | Archivo nuevo — `ParticipantDTO` |
| `core/models/admin.model.ts` | Añadidos `EventRegistrationAdminDTO`, `EventPaymentAdminDTO` |
| `core/services/admin.service.ts` | Añadidos `getEventRegistrations()`, `getEvent()`, `downloadCSV()` |
| `app.routes.ts` | Añadida ruta `events/:id` → `AdminEventDetailComponent` en children de admin |
| `DOCUMENTACION_PROYECTO.md` | Añadidas secciones 35 y 36, changelog v3.5, versión bumped a 3.5 |

---

### v3.2 — Abril 2026

#### Frontend — `HomeComponent` (`/home`)

| Cambio | Detalle |
|--------|---------|
| **Hero vídeo siempre visible** | El `<video>` del hero se renderiza siempre, sin ningún `@if` condicional al estado de autenticación. |
| **Vídeo silenciado explícitamente** | El `<video>` del hero tiene `muted autoplay loop playsinline` — sin audio en todos los navegadores. |
| **Saludo dinámico** | Solo el texto del saludo cambia: autenticado → `Bienvenido, <username>` · anónimo → `Bienvenido a CronoLimits`. |
| **Eliminación sección "Cómo funciona"** | Bloque `<section id="como-funciona">` eliminado del HTML. Clases CSS `.how-it-works*` eliminadas (incluidas media queries). |
| **Eliminación Trust Band** | Bloque `<section class="trust-band">` eliminado del HTML. Clases CSS `.trust-band*` eliminadas. |
| **Imagen en "Sobre nosotros"** | El `<video>` secundario reemplazado por `<img src="assets/images/sobre-nostros.jpg">`. Clase CSS `.cl-about__video` → `.cl-about__img`. |

#### Archivos modificados en v3.2

| Archivo | Tipo de cambio |
|---------|----------------|
| `cronolimits-frontend/src/app/features/home/home.component.html` | Eliminación de secciones, sustitución de vídeo por imagen |
| `cronolimits-frontend/src/app/features/home/home.component.css` | Eliminación de clases not usadas, renombrado `.cl-about__video` → `.cl-about__img` |
| `cronolimits-frontend/src/assets/images/sobre-nostros.jpg` | Asset añadido para sección "Sobre nosotros" |
| `DOCUMENTACION_PROYECTO.md` | Actualización sección 22, añadida sección 33, versión bumped a 3.2 |

---

### v3.3 — Abril 2026

#### Frontend — Patrón AuthDialog (flujo autenticación requerida)

| Cambio | Detalle |
|--------|---------| 
| **`AuthDialogService` (nuevo)** | Servicio singleton en `core/services/auth-dialog.service.ts`. Método `requireAuth(returnUrl, action)` que muestra diálogo SweetAlert2 con opciones "Iniciar sesión" / "Registrarse" / "Cancelar" cuando el usuario no está autenticado. |
| **`EventsListComponent` — botón Inscribirse** | Añadido botón "Inscribirse" en cada tarjeta del listado. Llama a `register(event.id)` que usa `AuthDialogService`. Solo visible si el evento no está cancelado ni finalizado. |
| **`EventDetailComponent` — método `register()`** | Refactorizado para usar `authDialog.requireAuth()` en lugar de redireccionamiento directo a `/login` con `redirectTo` inconsistente. |
| **`CartComponent` — botón "Ir al pago"** | El `<a routerLink="/checkout">` reemplazado por `<button (click)="goToCheckout()">`. El método usa `authDialog.requireAuth('/checkout', ...)`. |
| **`RegisterComponent` — `returnUrl`** | Añadida inyección de `ActivatedRoute` y lectura de `returnUrl`. Tras registro + auto-login exitoso navega a `returnUrl` en lugar de siempre a `/home`. |
| **`LoginComponent` — consistencia `returnUrl`** | Ya usaba `returnUrl`. Verificado que el parámetro y la navegación post-login son correctos (`navigateByUrl(returnUrl)`). |

#### Archivos modificados en v3.3

| Archivo | Tipo de cambio |
|---------|----------------|
| `core/services/auth-dialog.service.ts` | Archivo nuevo |
| `features/events/list/events-list.component.ts` | Añadido import `AuthDialogService`, `Router`; nuevo método `register(eventId)` |
| `features/events/list/events-list.component.html` | Botón "Inscribirse" en pie de tarjeta |
| `features/events/detail/event-detail.component.ts` | Import `AuthDialogService`, `register()` refactorizado |
| `features/shop/cart/cart.component.ts` | Import `AuthDialogService`, `Router`; nuevo método `goToCheckout()` |
| `features/shop/cart/cart.component.html` | `<a routerLink>` → `<button (click)>` en botón checkout |
| `features/auth/register/register.component.ts` | Import `ActivatedRoute`; `returnUrl` inyectado; navega a `returnUrl` tras registro |
| `DOCUMENTACION_PROYECTO.md` | Añadida sección 34, versión bumped a 3.3 |

---

### v3.4 — Abril 2026

#### Validación de nombre y apellidos — backend + frontend

| Cambio | Detalle |
|--------|---------|
| **`ProfileUpdateRequest.java`** | Añadida anotación `@Pattern(regexp = "^[\\p{L} '-]{2,50}$")` a los campos `name` y `lastname`. La expresión `\p{L}` cubre cualquier letra Unicode (ñ, á, é, ü, etc.). |
| **`RegisterRequest.java`** | Mismo patrón `@Pattern` añadido junto al `@Size` existente en `name` y `lastname`. |
| **`UserRequest.java`** | Añadidos imports `jakarta.validation.constraints.Pattern` y `Size`; mismas anotaciones `@Pattern` aplicadas. |
| **`profile.component.ts`** | Constante `namePattern = /^[\p{L} '\-]{2,50}$/u` (flag Unicode). Validadores `Validators.pattern(namePattern)` añadidos a los controles `name` y `lastname`. |
| **`profile.component.html`** | Bloque de errores de `name` y `lastname` ampliado con rama `@else if (errors?.['pattern'])` que muestra mensaje descriptivo al usuario. |

#### Archivos modificados en v3.4

| Archivo | Tipo de cambio |
|---------|----------------|
| `cronolimits-backend/src/main/java/…/users/models/ProfileUpdateRequest.java` | `@Pattern` en `name` y `lastname` |
| `cronolimits-backend/src/main/java/…/users/models/RegisterRequest.java` | `@Pattern` en `name` y `lastname` |
| `cronolimits-backend/src/main/java/…/users/models/UserRequest.java` | Imports + `@Pattern` en `name` y `lastname` |
| `cronolimits-frontend/src/app/features/profile/profile.component.ts` | `Validators.pattern(namePattern)` en formulario reactivo |
| `cronolimits-frontend/src/app/features/profile/profile.component.html` | Mensajes de error para validación `pattern` en nombre y apellidos |
| `DOCUMENTACION_PROYECTO.md` | Añadida entrada changelog v3.4, versión bumped a 3.4 |

---

## 38. Módulo CONFIG — Inicialización y recursos estáticos

### `DataInitializer`

Componente `@ApplicationRunner` que se ejecuta **una sola vez** al arrancar la aplicación.

**Función**: crea el usuario administrador por defecto (`adminPrueba`) si no existe ya en la base de datos.

- **Idempotente**: si `adminPrueba` ya existe, registra log INFO y no hace nada.
- Asigna roles `ROLE_ADMIN` y `ROLE_USER`.
- Usa `PasswordEncoder` (BCrypt) — nunca almacena la contraseña en texto plano.

### `WebConfig`

Implementa `WebMvcConfigurer` para servir archivos subidos en disco como recursos estáticos HTTP.

| URL HTTP | Directorio en disco |
|----------|---------------------|
| `/uploads/avatars/**` | `uploads/avatars/` (propiedad `app.upload-dir`) |
| `/uploads/events/**` | `uploads/events/` (propiedad `app.events-upload-dir`) |

---

## 39. Sistema de Verificación de Email

### Flujo completo

El registro de usuario en v4.0 es un proceso en **dos pasos** que garantiza que solo existen cuentas con email verificado en la tabla `users`.

```
Formulario de registro (Angular)
       ↓
POST /api/auth/register
       ↓
 EmailVerificationService.registerPending()
       ├── Comprueba unicidad email/username
       ├── Crea fila en pending_registrations (token UUID, expira 24 h)
       └── EmailService.sendVerificationEmail() → Gmail SMTP

         ↓ (usuario pulsa enlace del correo)

GET /api/auth/verify?token=<uuid>
       ↓
 EmailVerificationService.verifyAndCreateUser(token)
       ├── Valida token y expiración
       ├── Crea User real en users (enabled=true, ROLE_USER)
       └── Elimina pending_registrations
```

### Reenvío con rate-limiting

```
POST /api/auth/resend-verification  { "email": "..." }
       ↓
 EmailVerificationService.resendVerification(email)
       ├── Rate-limit: lastSentAt + 5 min > now → 409
       ├── Regenera token UUID + actualiza expiresAt + lastSentAt
       └── EmailService.sendVerificationEmail() (nuevo enlace)
```

### Emails transaccionales implementados

| Tipo | Método | Cuándo |
|------|--------|--------|
| Verificación de cuenta | `sendVerificationEmail` | Al registrarse / al reenviar |
| Cancelación de evento | `sendEventCancellationEmail` | Al cancelar un evento (admin) |
| Cancelación de pedido | `sendOrderCancellationEmail` | Al cancelar un pedido (admin) |

La implementación usa Spring `JavaMailSender` con Gmail SMTP (puerto 587, STARTTLS obligatorio). Las credenciales se configuran mediante variables de entorno `GMAIL_ADDRESS` / `GMAIL_APP_PASSWORD`.

---

## 40. Módulo SHOP — Reseñas de productos (Reviews)

### Descripción

Sistema completo de valoraciones de productos introducido en v4.0. Un usuario autenticado puede dejar una reseña (1-5 estrellas + comentario opcional) por cada producto.

### Entidad `Review`

```java
@Entity @Table(name = "reviews",
    uniqueConstraints = @UniqueConstraint(columnNames = {"product_id", "user_id"}))
public class Review {
    Long id;
    Product product;          // @ManyToOne(LAZY)
    User user;                // @ManyToOne(LAZY)
    Integer stars;            // @Min(1) @Max(5)
    String comment;           // TEXT, nullable
    Boolean verifiedPurchase; // calculado al crear
    LocalDateTime createdAt;  // @PrePersist
}
```

### Reglas de negocio (`ReviewServiceImpl`)

1. El producto debe existir y tener `active = true` → 404 si no.
2. Un usuario no puede valorar el mismo producto dos veces → `DuplicateReviewException` (409).
3. `verifiedPurchase` se calcula automáticamente: `true` si el usuario tiene algún pedido con `status="PAID"` que contenga ese producto.

### Endpoints

| Method | URL | Acceso | Descripción |
|--------|-----|--------|-------------|
| `GET` | `/api/products/{productId}/reviews` | 🌐 | Lista paginada; `?page`, `?size` (max 50), `?sort=recent\|top` |
| `POST` | `/api/products/{productId}/reviews` | 🔒 | Crear reseña; 201 `ReviewDTO` |

### Modelos frontend (`core/models/review.ts`)

```typescript
interface ReviewDTO      { id, username, stars, comment, verifiedPurchase, createdAt }
interface ReviewRequest  { stars: number; comment?: string }
interface ReviewPage     { content: ReviewDTO[]; totalElements; totalPages; number; size; first; last }
type ReviewSortOption  = 'recent' | 'top'
```

---

## 41. Frontend Angular — Servicios nuevos v4.0

### `ToastService`

Servicio singleton para notificaciones no bloqueantes con SweetAlert2.

| Método | Comportamiento |
|--------|---------------|
| `success(message)` | Toast verde, `top-end`, auto-cierre 2500 ms |
| `error(message)` | Toast rojo, auto-cierre 4000 ms |
| `info(message)` | Toast azul, auto-cierre 3000 ms |

### `EventReminderService`

Calcula inscripciones activas que empiezan en las próximas 24 h.

| Propiedad / método | Tipo | Descripción |
|--------------------|------|-------------|
| `upcomingAlerts$` | `Observable<RegistrationDTO[]>` | Stream reactivo de alertas |
| `load()` | `Observable<RegistrationDTO[]>` | Carga y filtra inscripciones próximas |
| `dismiss(id)` | `void` | Descarta alerta en `sessionStorage` (clave `cl_dismissed_reminders`) |

Reutiliza `RegistrationService.getMyRegistrations()` — sin ningún nuevo endpoint de backend.

### `ReviewService`

Ver sección 40 para la documentación completa.

---

## 42. Frontend Angular — VerifyEmailComponent

**Ruta**: `/auth/verify`  
**Archivo**: `features/auth/verify-email/verify-email.component.ts`

Página visitada al pulsar el enlace del correo de verificación.

### Estados

| Estado | Condición | Qué muestra |
|--------|-----------|-------------|
| `'loading'` | Llamada API en curso | Spinner |
| `'success'` | API devuelve 200 | Confirmación + enlace a `/login` |
| `'expired'` | API devuelve 409 | Mensaje + formulario de reenvío |
| `'invalid'` | API devuelve 400 o token ausente | Mensaje de enlace inválido |
| `'error'` | Otro error HTTP | Mensaje genérico |

### Formulario de reenvío (`resendForm`)

Visible en estados `'expired'` e `'invalid'`. Campo `email` (`required`, `email`).

```typescript
resendVerification(): void
// POST /api/auth/resend-verification { email }
// 200 → resendMessage = "Email enviado..."
// 409 → resendMessage = err.error.message (rate-limit activo)
```

---

## 33. Historial de cambios — Changelog

### v4.1 — Abril 2026

#### Backend — Fix filtro de fechas en eventos

**Problema**: El endpoint `GET /api/events` aceptaba `fromDate` y `toDate` como `LocalDateTime`
con `@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)`. El `<input type="date">` del navegador
produce valores en formato `yyyy-MM-dd` (ej. `2026-04-29`), no `yyyy-MM-ddTHH:mm:ss`. Spring
no podía convertir el parámetro y lanzaba `MethodArgumentTypeMismatchException`, que caía al
handler genérico `Exception` → HTTP 500 → "contacte al administrador".

**Fix — `EventController.java`**

| Cambio | Detalle |
|--------|---------|
| **Tipo de parámetros** | `LocalDateTime` → `LocalDate` en `fromDate` y `toDate` |
| **Anotación** | `ISO.DATE_TIME` → `ISO.DATE` (formato `yyyy-MM-dd`) |
| **Conversión interna** | `fromDate.atStartOfDay()` y `toDate.atTime(23, 59, 59)` para construir el rango `LocalDateTime` que usa la consulta JPA |

**Fix — `GlobalExceptionHandler.java`**

Añadido handler específico para `MethodArgumentTypeMismatchException`:
```java
@ExceptionHandler(MethodArgumentTypeMismatchException.class)
public ResponseEntity<ApiError> handleTypeMismatch(MethodArgumentTypeMismatchException ex,
                                                   HttpServletRequest req) {
    String msg = String.format("El parámetro '%s' tiene un valor inválido: '%s'",
            ex.getName(), ex.getValue());
    return build(HttpStatus.BAD_REQUEST, msg, req);
}
```
Ahora retorna HTTP 400 con mensaje descriptivo en lugar de 500.

#### Frontend Angular — Módulo Legal (Cookies, Privacidad, Términos)

Se han creado tres componentes standalone con contenido RGPD/LSSI-CE completo.

| Componente | Ruta | CSS prefix | Descripción |
|------------|------|-----------|-------------|
| `PrivacyPolicyComponent` | `/privacy` | `.lp-*` | Política de privacidad — responsable, datos, finalidades, derechos ARCO, AEPD, seguridad |
| `TermsOfUseComponent` | `/terms` | `.tu-*` | Términos de uso — condiciones, precios, desistimiento 14 días, propiedad intelectual, jurisdicción Zaragoza |
| `CookiesPolicyComponent` | `/cookies` | `.cp-*` | Política de cookies — tabla de tipos, gestión por navegador, opt-out, terceros (Google, Stripe) |

#### Frontend Angular — Footer y rutas

| Cambio | Detalle |
|--------|---------|
| **`footer.component.html`** | Los 3 enlaces legales usan `routerLink` (SPA navigation sin recarga) en lugar de `href` |
| **`app.routes.ts`** | Añadidas rutas `{ path: 'privacy' }`, `{ path: 'terms' }`, `{ path: 'cookies' }` con importación directa de cada componente |

#### Frontend Angular — Mensajes de error en eventos

| Cambio | Detalle |
|--------|---------|
| **`events-list.component.ts`** | El bloque `error:` del `subscribe()` ahora diferencia por `err.status`: 400 → "Los filtros aplicados no son válidos…", 0 → "No se pudo conectar con el servidor…", otros → mensaje genérico |

#### Archivos modificados en v4.1

| Archivo | Tipo de cambio |
|---------|----------------|
| `events/controllers/EventController.java` | `fromDate`/`toDate` de `LocalDateTime+ISO.DATE_TIME` a `LocalDate+ISO.DATE`; conversión interna a `LocalDateTime` |
| `common/error/GlobalExceptionHandler.java` | Nuevo handler `MethodArgumentTypeMismatchException` → 400 |
| `features/legal/privacy-policy/privacy-policy.component.ts` | Archivo nuevo |
| `features/legal/privacy-policy/privacy-policy.component.html` | Archivo nuevo |
| `features/legal/privacy-policy/privacy-policy.component.css` | Archivo nuevo |
| `features/legal/terms-of-use/terms-of-use.component.ts` | Archivo nuevo |
| `features/legal/terms-of-use/terms-of-use.component.html` | Archivo nuevo |
| `features/legal/terms-of-use/terms-of-use.component.css` | Archivo nuevo |
| `features/legal/cookies-policy/cookies-policy.component.ts` | Archivo nuevo |
| `features/legal/cookies-policy/cookies-policy.component.html` | Archivo nuevo |
| `features/legal/cookies-policy/cookies-policy.component.css` | Archivo nuevo |
| `shared/components/footer/footer.component.html` | 3 enlaces legales con `routerLink` |
| `app.routes.ts` | Rutas `/privacy`, `/terms`, `/cookies` añadidas |
| `features/events/list/events-list.component.ts` | Mensajes de error diferenciados por `err.status` |
| `DOCUMENTACION_PROYECTO.md` | Sección 43, changelog v4.1, Estado del Proyecto v4.1, versión bumped a 4.1 |

---

### v4.0 — Abril 2026

#### Backend — Sistema de verificación de email (registro en 2 pasos)

| Cambio | Detalle |
|--------|---------|
| **`AuthController` — refactorización completa** | `POST /api/auth/register` ya no crea el usuario directamente. Devuelve **202 Accepted**. Añadidos `GET /api/auth/verify?token=` y `POST /api/auth/resend-verification`. |
| **`PendingRegistration` (nueva entidad)** | Tabla `pending_registrations`. Campos: token (UUID/unique), datos del formulario, passwordHash (BCrypt), createdAt, expiresAt (+24h), lastSentAt (rate-limiting). |
| **`PendingRegistrationRepository`** | Spring Data JPA: `findByToken`, `findByEmail`, `findByUsername`. |
| **`EmailVerificationService` + `EmailVerificationServiceImpl`** | Flujo completo: guardar pendiente → enviar email → verificar token → crear usuario → eliminar pendiente. Rate-limiting de 5 min entre reenvíos con `lastSentAt`. |
| **`EmailService` + `EmailServiceImpl`** | Spring Mail + Gmail SMTP. Métodos: `sendVerificationEmail`, `sendEventCancellationEmail`, `sendOrderCancellationEmail`. |
| **`application.properties`** | Gmail SMTP completo + `app.mail.from` + `app.frontend.url` + `app.events-upload-dir`. |
| **`DuplicateReviewException`** | Nueva excepción dominio en `common/exceptions/`. HTTP 409. |
| **`GlobalExceptionHandler`** | Handler para `DuplicateReviewException` → 409. |

#### Backend — Reseñas de productos

| Cambio | Detalle |
|--------|---------|
| **`Review` (nueva entidad)** | Tabla `reviews` con `UNIQUE(product_id, user_id)`. `stars` [1-5], `comment` nullable, `verifiedPurchase` calculado. |
| **`ReviewRepository`** | `findByProductId(Long, Pageable)`, `existsByProductIdAndUserId`. |
| **`ReviewService` + `ReviewServiceImpl`** | Verificar producto activo, detectar duplicado, calcular `verifiedPurchase`, persistir. |
| **`ReviewController`** | `GET` público paginado (`size` limitado a 50) y `POST` autenticado. |
| **`ReviewDTO` + `ReviewRequest` + `ReviewStatsProjection` + `ReviewMapper`** | Nuevos modelos y mapper. `ReviewDTO` expone `username` (no `userId`). |

#### Backend — Módulo CONFIG

| Cambio | Detalle |
|--------|---------|
| **`DataInitializer`** | `@ApplicationRunner` en `config/`. Crea `adminPrueba` si no existe. Idempotente. |
| **`WebConfig`** | `WebMvcConfigurer` en `config/`. Sirve `/uploads/avatars/**` y `/uploads/events/**` desde disco. |

#### Frontend — Verificación de email

| Cambio | Detalle |
|--------|---------|
| **`VerifyEmailComponent` (nuevo)** | `features/auth/verify-email/`. Estados: `loading`, `success`, `expired`, `invalid`, `error`. En expirado/inválido muestra formulario de reenvío. |
| **`AuthService` — métodos nuevos** | `verifyEmail(token)` → `GET /api/auth/verify?token=`. `resendVerification(email)` → `POST /api/auth/resend-verification`. |

#### Frontend — Nuevos servicios y modelos

| Cambio | Detalle |
|--------|---------|
| **`ToastService` (nuevo)** | `core/services/toast.service.ts`. `success()`, `error()`, `info()`. |
| **`EventReminderService` (nuevo)** | `core/services/event-reminder.service.ts`. Alertas 24 h. BehaviorSubject `upcomingAlerts$`. Descarte en `sessionStorage`. |
| **`ReviewService` (nuevo)** | `core/services/review.service.ts`. `getReviews()` y `submitReview()`. |
| **`review.ts` (nuevo)** | `core/models/review.ts`. `ReviewDTO`, `ReviewRequest`, `ReviewPage`, `ReviewSortOption`. |

#### Archivos modificados/creados en v4.0

| Archivo | Tipo de cambio |
|---------|----------------|
| `auth/AuthController.java` | Refactorizado: `register` → 202; nuevos `verify` y `resend-verification` |
| `auth/entities/PendingRegistration.java` | Archivo nuevo |
| `auth/repositories/PendingRegistrationRepository.java` | Archivo nuevo |
| `auth/services/EmailService.java` | Archivo nuevo |
| `auth/services/EmailServiceImpl.java` | Archivo nuevo |
| `auth/services/EmailVerificationService.java` | Archivo nuevo |
| `auth/services/EmailVerificationServiceImpl.java` | Archivo nuevo |
| `common/exceptions/DuplicateReviewException.java` | Archivo nuevo |
| `common/error/GlobalExceptionHandler.java` | Handler `DuplicateReviewException` → 409 |
| `shop/entities/Review.java` | Archivo nuevo |
| `shop/repositories/ReviewRepository.java` | Archivo nuevo |
| `shop/services/ReviewService.java` | Archivo nuevo |
| `shop/services/ReviewServiceImpl.java` | Archivo nuevo |
| `shop/controllers/ReviewController.java` | Archivo nuevo |
| `shop/models/ReviewDTO.java` | Archivo nuevo |
| `shop/models/ReviewRequest.java` | Archivo nuevo |
| `shop/models/ReviewStatsProjection.java` | Archivo nuevo |
| `shop/mappers/ReviewMapper.java` | Archivo nuevo |
| `config/DataInitializer.java` | Archivo nuevo |
| `config/WebConfig.java` | Archivo nuevo |
| `resources/application.properties` | Gmail SMTP, `app.events-upload-dir`, `app.mail.from`, `app.frontend.url` |
| `core/services/auth.service.ts` | Añadidos `verifyEmail()` y `resendVerification()` |
| `core/services/review.service.ts` | Archivo nuevo |
| `core/services/toast.service.ts` | Archivo nuevo |
| `core/services/event-reminder.service.ts` | Archivo nuevo |
| `core/models/review.ts` | Archivo nuevo |
| `features/auth/verify-email/verify-email.component.ts` | Archivo nuevo |
| `features/auth/verify-email/verify-email.component.html` | Archivo nuevo |
| `app.routes.ts` | Añadida ruta `/auth/verify` |
| `DOCUMENTACION_PROYECTO.md` | Secciones 38-42, changelog v4.0, versión bumped a 4.0 |

---

## 43. Frontend Angular — Módulo Legal (Cookies, Privacidad, Términos)

### Descripción

Conjunto de tres componentes standalone que cumplen los requisitos legales de la RGPD (Reglamento General de Protección de Datos) y la LSSI-CE (Ley de Servicios de la Sociedad de la Información). Son páginas públicas accesibles desde el footer de la aplicación.

### Componentes

#### `PrivacyPolicyComponent`

**Ruta**: `/privacy`  
**Archivos**: `features/legal/privacy-policy/privacy-policy.component.ts` · `.html` · `.css`  
**CSS prefix**: `.lp-*`

| Sección | Contenido |
|---------|-----------|
| 1. Responsable del tratamiento | Tabla con empresa, CIF, dirección, email de contacto |
| 2. Datos que recopilamos | Lista de datos personales tratados (nombre, email, teléfono, ubicación…) |
| 3. Finalidades y base legal | Tabla con 7 finalidades y su base jurídica (RGPD art. 6) |
| 4. Derechos del interesado | Grid de 6 tarjetas (acceso, rectificación, supresión, oposición, portabilidad, limitación) + enlace AEPD |
| 5. Seguridad | Descripción de medidas técnicas y organizativas |
| 6. Cookies | Referencia a la Política de Cookies con `routerLink="/cookies"` |
| 7. Terceros | Stripe (pagos), Google Analytics (analítica) |
| 8. Contacto | Dirección de email para ejercer derechos o formular consultas |

#### `TermsOfUseComponent`

**Ruta**: `/terms`  
**Archivos**: `features/legal/terms-of-use/terms-of-use.component.ts` · `.html` · `.css`  
**CSS prefix**: `.tu-*`

| Sección | Contenido |
|---------|-----------|
| 1. Objeto | Descripción del servicio CronoLimits |
| 2. Acceso y registro | Condiciones de edad, veracidad de datos |
| 3. Condiciones de uso | Uso permitido y prohibido del servicio |
| 4. Precios y pagos | Stripe, IVA, confirmación por email |
| 5. Política de devoluciones | Caja destacada (`.tu-highlight`) — derecho de desistimiento 14 días (RDLeg 1/2007 art. 102). Excepciones para inscripciones a eventos con fecha pasada |
| 6. Responsabilidad | Límites de responsabilidad del prestador |
| 7. Propiedad intelectual | Derechos sobre contenidos, logos y marca |
| 8. Jurisdicción | Legislación española, LSSI-CE, tribunales de Zaragoza |

**Elemento de diseño notable**: la sección de devoluciones usa `.tu-highlight` — caja con borde izquierdo ámbar y fondo tintado para resaltar la política de no reembolso en inscripciones a eventos con fecha pasada.

#### `CookiesPolicyComponent`

**Ruta**: `/cookies`  
**Archivos**: `features/legal/cookies-policy/cookies-policy.component.ts` · `.html` · `.css`  
**CSS prefix**: `.cp-*`

| Sección | Contenido |
|---------|-----------|
| 1. ¿Qué son las cookies? | Definición técnica |
| 2. Tipos de cookies utilizadas | Tabla con 4 tipos: Técnicas (sesión), Preferencias (idioma/región), Analíticas (Google Analytics), Pagos (Stripe) |
| 3. Gestión de cookies | Instrucciones para Chrome, Firefox, Safari, Edge |
| 4. Opt-out de analítica | Enlace al add-on de inhabilitación de Google Analytics |
| 5. Terceros | Referencias a políticas de Google y Stripe |
| 6. Contacto | Email para consultas sobre cookies |

### Footer — Integración

El `FooterComponent` (`shared/components/footer/footer.component.html`) expone los 3 enlaces mediante `routerLink` de Angular Router (navegación SPA sin recarga de página):

```html
<nav aria-label="Legal">
  <a routerLink="/privacy" class="cl-footer__legal-link">Política de privacidad</a>
  <span aria-hidden="true">·</span>
  <a routerLink="/terms" class="cl-footer__legal-link">Términos de uso</a>
  <span aria-hidden="true">·</span>
  <a routerLink="/cookies" class="cl-footer__legal-link">Política de cookies</a>
</nav>
```

### Convenciones de CSS

| Componente | Prefijo | Clases de nota |
|------------|---------|----------------|
| `PrivacyPolicyComponent` | `.lp-*` | `.lp-info-table`, `.lp-rights-grid` (grid 6 tarjetas) |
| `TermsOfUseComponent` | `.tu-*` | `.tu-highlight` (caja ámbar de devoluciones) |
| `CookiesPolicyComponent` | `.cp-*` | `.cp-cookie-table` (tabla de tipos de cookies) |

---

**Versión del documento**: 5.1
**Última actualización**: Mayo 2026
**Proyecto**: CronoLimits-App  
**Stack**: Spring Boot 4.0.3 · Java 17 · PostgreSQL · Angular 21.2

