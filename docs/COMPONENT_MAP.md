# Frontend component map

Generated from 15 focused frontend modules: 80 top-level functions/components.
Props, state, API calls and child components are static approximations and must be reviewed with behavioral changes.
Module sizes are UTF-8 bytes after normalizing line endings to LF for cross-platform reproducibility.

| Name | Module | Domain | Props/args | Local state | API calls | Child components | Line |
|---|---|---|---|---|---|---|---:|
| nextOnboardingStep | app.jsx | app/auth | user | none | none | none | 26 |
| PortalRobin | app.jsx | app/auth | none | authState, active, selectedPortal | apiLogin, apiLogout, apiMe, onboardingState, paymentsVerify | PortalSelector, LoginScreen, AdminPortal, OnboardingOrigin, OnboardingDNI, OnboardingContract, OnboardingPayment, OnboardingProfile, PortalShell | 36 |
| AuthShell | app.jsx | app/auth | { children } | none | none | none | 149 |
| PortalSelector | app.jsx | app/auth | { onSelectPortal } | none | none | AuthShell, Icon | 190 |
| LoginScreen | app.jsx | app/auth | { onLogin, onBack } | email, password, error, loading | none | AuthShell, Field, Btn | 230 |
| useDebounced | application/AdminPortal.jsx | application/admin | value, delay = 250 | v | none | none | 51 |
| normalizeAdminClient | application/AdminPortal.jsx | application/admin | apiClient, adminId | none | none | none | 58 |
| formatBirthDate | application/AdminPortal.jsx | application/admin | value | none | none | none | 74 |
| birthdayIsToday | application/AdminPortal.jsx | application/admin | value | none | none | none | 81 |
| AdminDashboard | application/AdminPortal.jsx | application/admin | { user, onOpenClient, onOpenAssign, onGotoTab } | loading, error, data, alertSort, taskTitle, taskBusy, refreshKey | adminDashboard, adminTaskCreate, adminTaskToggle, adminTaskDelete | Card, CardContent, Btn, KpiCard, CardHeader, Badge, Row, Divider | 94 |
| AdminChatAssistant | application/AdminPortal.jsx | application/admin | { user, activeClientId, clients, mascot } | mode, messages, draft, busy, error, notesOpen, notesText, notesUserId, notesTitle, notesBusy | adminAssistant, adminHistorialAdd | Btn | 553 |
| AdminPortal | application/AdminPortal.jsx | application/admin | { user, onLogout } | data, mascot, searchQ, loadingClients, loadError, assignOpen, assignList, assignLoading, assignError, assignBusyId | adminListClients, adminListAllClients, adminAssignClient | AdminWorkspace, AdminDashboard, AdminClientesList, AdminEstadoFases, AdminPerfil, AdminCarrerasNew, AdminDocumentosNew, AdminChatIA, AdminReservas, AdminPerfilAcademico | 742 |
| AdminPerfilAcademico | application/AdminPortal.jsx | application/admin | { client } | none | none | Card, CardHeader, CardContent, Badge | 935 |
| AdminNotificaciones | application/AdminPortal.jsx | application/admin | { adminId, clients } | title, content, type, scope, selected, allClients, loadingAll, busy, feedback, error | adminListAllClients, adminNotificationsList, adminNotificationCreate | Badge, Card, CardHeader, CardContent, Field, TextareaField, Btn | 992 |
| ClientAvatar | application/AdminPortal.jsx | application/admin | { nombre, apellidos, size = "md" } | none | none | none | 1208 |
| AdminClientesList | application/AdminPortal.jsx | application/admin | { clients, totalCount, searchQ, onSearch, onSelect, loading, loadError, onOpenAssign } | none | none | Card, CardHeader, Badge, Btn, CardContent, ClientAvatar | 1222 |
| AssignClientModal | application/AdminPortal.jsx | application/admin | { adminEmail, list, loading, error, busyId, onAssign, onClose } | q | none | ClientAvatar, Badge, Btn | 1291 |
| AdminPerfil | application/AdminPortal.jsx | application/admin | { client, onRefresh } | sugg, suggLoading, suggErr, regening, feedbackBusy, showQ | adminCareerSuggestions, adminCareerSuggestionsRegenerate, adminCareerSuggestionFeedback | Card, CardHeader, CardContent, Badge, LivedAbroadCard, Btn | 1365 |
| AdminReservas | application/AdminPortal.jsx | application/bookings | { client } | bookings, loading, error | bookingsList | Card, CardHeader, CardContent, Badge | 1659 |
| AdminPagos | application/AdminPortal.jsx | application/payments | { client } | data, loading, error, busyId, facturaOpen, facturaPayment, now, xConcept, xAmount, xDue | adminPaymentsList, adminPaymentsUnlock, adminPaymentsSetAmount, adminPaymentsSetCarreras, adminPaymentsAdd, adminPaymentsDelete | Card, CardHeader, CardContent, Btn, PaymentStatusBadge, Field, Factura | 1747 |
| AdminCarrerasNew | application/AdminPortal.jsx | application/careers | { client } | library, assigned, loading, error, cName, cUni, cCity, cLevel, cDocs, editingId | adminCareersListAll, adminCareersCreate, adminCareersDelete, adminCareersAssign, adminCareersUnassign | Card, CardHeader, Btn, CardContent, Field, Divider, CareerRequirementsTimeline | 1986 |
| AdminDocumentosNew | application/AdminPortal.jsx | application/documents | { client } | docs, loading, error, busyId, newName, newRequired, newTemplate | documentsGet, adminDocumentsList, adminDocumentsReview, adminDocumentsAdd, adminDocumentsDelete | Card, CardHeader, CardContent, Field, Btn, Badge | 2230 |
| AdminEstadoFases | application/AdminPortal.jsx | application/admin | { client, onChangedPhase } | phase, busy, error | adminPhaseSet | ClientAvatar, Card, CardHeader, CardContent | 2375 |
| AdminWorkspace | application/AdminWorkspace.jsx | shared/application | { adminName, active, client, clients, loading, error, onNavigate, onSwitchClient, onLogout, children } | pickerOpen | none | Icon, ClientPicker | 25 |
| ClientPicker | application/AdminWorkspace.jsx | shared/application | { clients, selectedId, onSelect, onClose, returnRef } | query | none | none | 69 |
| PortalShell | application/ApplicationPortals.jsx | application/client | { user, clientName, onLogout, active, setActive, onUserRefresh } | profilePhoto, photoBusy, photoError, chatOpen, mascot, summary | documentsList, bookingsList, profileAvatarUpload | NotificationPopup, Icon, AnimatePresence, Estado, Perfil, CarrerasCliente, DocumentosCliente, Reservas, PagosCliente, FaqsPage | 46 |
| StudentAssistant | application/ApplicationPortals.jsx | application/client | { open, onOpenChange, mascot, onOpenFaq } | none | none | ChatIA | 170 |
| Estado | application/ApplicationPortals.jsx | application/client | { step, onNavigate, docsPendingCount, bookingsCount } | none | none | Icon, Card, CardHeader, CardContent | 202 |
| LivedAbroadCard | application/ApplicationPortals.jsx | application/client | { value, editable, onSaved, userId } | lived, country, other, busy, savedAt, error | livedAbroadSave | Card, CardHeader, CardContent, Field, Btn | 269 |
| Perfil | application/ApplicationPortals.jsx | application/client | { user, clientName, profilePhoto, onPhotoChange, photoBusy, photoError, intereses, onUserRefresh } | none | none | Card, CardContent, Badge, LivedAbroadCard | 355 |
| Carreras | application/ApplicationPortals.jsx | application/careers | { templates, selectedIds, onSetSelected } | none | none | Card, CardHeader, CardContent, Divider, Badge | 428 |
| Documentos | application/ApplicationPortals.jsx | application/documents | { requests, pending, done, uploadedDocs, onUpload, onView, onDownload } | file, displayName, selectedReqId | none | Card, CardHeader, CardContent, Field, Btn, Badge | 489 |
| ChatIA | application/ApplicationPortals.jsx | application/client | { active, mascot, onOpenFaq } | messages, aiPaused, draft, loading, sending, error | chatAiList, chatAiSend | none | 581 |
| AdminChatIA | application/ApplicationPortals.jsx | application/admin | { client } | messages, aiPaused, draft, loading, busy, error | adminChatList, adminChatSend, adminChatResume | Card, CardHeader, CardContent, Btn | 686 |
| Reservas | application/ApplicationPortals.jsx | application/bookings | none | serverBookings, loading, error, busy, refreshKey, lastCreated, avDays, avLoading, advisorName, calendarConnected | bookingsList, bookingsCreate, bookingsAvailability | Card, CardHeader, CardContent, Btn, Badge | 811 |
| careerTimelineItems | application/careers/CareerRequirementsTimeline.jsx | shared/application | careers = [] | none | none | none | 6 |
| formatDeadline | application/careers/CareerRequirementsTimeline.jsx | shared/application | value | none | none | none | 23 |
| CareerRequirementsTimeline | application/careers/CareerRequirementsTimeline.jsx | shared/application | { careers = [], title = "Timeline de requerimientos" } | none | none | Card, CardHeader, CardContent, Icon, Badge | 30 |
| PagosCliente | application/ClientSections.jsx | application/payments | none | data, loading, loadError, facturaOpen, facturaPayment, payBusy | paymentsList, paymentsCheckout | Card, CardHeader, CardContent, PaymentStatusBadge, Btn, Factura | 14 |
| CarrerasCliente | application/ClientSections.jsx | application/careers | none | careers, loading, error | careersListMine | Card, CardHeader, CardContent, Badge, CareerRequirementsTimeline | 121 |
| DocumentosCliente | application/ClientSections.jsx | application/documents | none | docs, loading, error, uploadingId | documentsList, documentsGet, documentsUpload | Badge, Btn, Card, CardHeader, CardContent | 178 |
| buildDefaultDocs | application/documents/document-utils.js | application/documents | level | none | none | none | 28 |
| statusLabel | application/documents/document-utils.js | application/documents | status | none | none | none | 46 |
| newCareerRequirement | application/documents/document-utils.js | application/documents | type = 'document' | none | none | none | 53 |
| normalizeCareerRequirement | application/documents/document-utils.js | application/documents | requirement = {} | none | none | none | 67 |
| FaqsPage | application/Faqs.jsx | shared/application | none | faqs | faqsList | Card, CardContent | 6 |
| AdminFaqManager | application/Faqs.jsx | shared/application | none | faqs | faqsList, adminFaqMutate | Btn, Card, CardHeader, CardContent, Field, TextareaField, Badge | 28 |
| OnboardingOrigin | application/onboarding/OnboardingFlow.jsx | application/onboarding | { user, onLogout, onDone } | origin, level, pais, hasEu, screen, error, busy | originSave | Ic, OnboardingShell, Choice, Field, Btn | 37 |
| OnboardingDNI | application/onboarding/OnboardingFlow.jsx | application/onboarding | { user, onLogout, onDone } | anverso, reverso, aPreview, rPreview, phase, error, busy, fields | dniExtract, dniSave | OnboardingShell, UploadSlot, Btn, Field | 173 |
| UploadSlot | application/onboarding/OnboardingFlow.jsx | application/onboarding | { label, preview, onPick } | none | none | Hl | 306 |
| renderContractText | application/onboarding/OnboardingFlow.jsx | application/onboarding | text, values | none | none | Hl | 357 |
| renderContractBlock | application/onboarding/OnboardingFlow.jsx | application/onboarding | b, i, values | none | none | none | 368 |
| OnboardingContract | application/onboarding/OnboardingFlow.jsx | application/onboarding | { user, onLogout, onDone } | nombreCliente, dniCliente, selectedExtras, agree, sigDataUrl, busy, error | contractSave | OnboardingShell, Hl, FieldReadOnly, Field, SignaturePad, Btn | 389 |
| Hl | application/onboarding/OnboardingFlow.jsx | application/onboarding | { children } | none | none | none | 581 |
| FieldReadOnly | application/onboarding/OnboardingFlow.jsx | application/onboarding | { label, value } | none | none | none | 589 |
| SignaturePad | application/onboarding/OnboardingFlow.jsx | application/onboarding | { onChange } | drawing, empty | none | none | 598 |
| OnboardingPayment | application/onboarding/OnboardingFlow.jsx | application/onboarding | { user, onLogout, onDone } | busy, error, confirming | onboardingCheckout | OnboardingShell, Btn | 649 |
| initQuestionnaireAnswers | application/onboarding/OnboardingFlow.jsx | application/onboarding | none | none | none | none | 738 |
| qOptLabel | application/onboarding/OnboardingFlow.jsx | application/onboarding | options, v | none | none | none | 746 |
| qFmtSlider | application/onboarding/OnboardingFlow.jsx | application/onboarding | def, val | none | none | none | 751 |
| QSlider | application/onboarding/OnboardingFlow.jsx | application/onboarding | { value, min, max, step, left, right, suffix, onChange } | none | none | none | 757 |
| QChoiceGrid | application/onboarding/OnboardingFlow.jsx | application/onboarding | { options, value, multi, max, onChange } | none | none | none | 773 |
| QuestionField | application/onboarding/OnboardingFlow.jsx | application/onboarding | { def, value, onChange } | none | none | QSlider, QChoiceGrid | 805 |
| OnboardingProfile | application/onboarding/OnboardingFlow.jsx | application/onboarding | { user, onLogout, onDone } | email, intereses, answers, academicSystem, academicSubjects, screen, error, busy | profileSave | OnboardingShell, Field, QuestionField, Btn | 832 |
| OnboardingShell | application/onboarding/OnboardingFlow.jsx | application/onboarding | { title, subtitle, stepNumber, totalSteps = 5, icon, onLogout, children } | none | none | Stepper | 1152 |
| Stepper | application/onboarding/OnboardingFlow.jsx | application/onboarding | { current, total = 3 } | none | none | none | 1204 |
| Factura | application/payments/InvoiceReceipt.jsx | application/payments | { open, onClose, user, payment } | none | none | Btn | 8 |
| eur | application/payments/payment-utils.jsx | application/payments | value | none | none | none | 4 |
| daysBetween | application/payments/payment-utils.jsx | application/payments | startIso, endIso | none | none | none | 11 |
| PaymentStatusBadge | application/payments/payment-utils.jsx | application/payments | { status } | none | none | Badge | 17 |
| paymentTitle | application/payments/payment-utils.jsx | application/payments | payment, total | none | none | none | 23 |
| reportClientError | client-utils.js | shared/application | operation, error | none | none | none | 1 |
| formatTime | client-utils.js | shared/application | date | none | none | none | 9 |
| formatDate | client-utils.js | shared/application | d | none | none | none | 17 |
| formatMoney | client-utils.js | shared/application | amount, currency | none | none | none | 23 |
| resizeImageFile | client-utils.js | shared/application | file, max = 256 | none | none | none | 30 |
| KpiCard | shared/PortalWidgets.jsx | shared/application | { icon: Icon, label, value, sub, tone = "navy" } | none | none | Icon | 9 |
| Row | shared/PortalWidgets.jsx | shared/application | { label, value, tone = "slate" } | none | none | none | 25 |
| BirthdayConfetti | shared/PortalWidgets.jsx | shared/application | none | none | none | none | 37 |
| NotificationPopup | shared/PortalWidgets.jsx | shared/application | none | queue, idx, busy, loaded | notificationAck, notificationsPending | BirthdayConfetti, Btn | 55 |

## Modules

| Module | Bytes | Responsibility |
|---|---:|---|
| app.jsx | 11551 | composition root and authentication screens |
| application/AdminPortal.jsx | 120263 | advisor portal and application administration |
| application/AdminWorkspace.jsx | 7506 | focused frontend component module |
| application/ApplicationPortals.jsx | 53201 | application client portal composition |
| application/careers/CareerRequirementsTimeline.jsx | 3283 | focused frontend component module |
| application/ClientSections.jsx | 13474 | client payments, careers and documents |
| application/documents/document-utils.js | 2918 | document phases, defaults and status mapping |
| application/Faqs.jsx | 6392 | focused frontend component module |
| application/onboarding/OnboardingFlow.jsx | 57923 | application onboarding flow |
| application/payments/InvoiceReceipt.jsx | 4666 | printable payment receipt |
| application/payments/payment-utils.jsx | 837 | payment formatting and status UI |
| client-utils.js | 1873 | browser-safe formatting, logging and image helpers |
| main.jsx | 239 | focused frontend component module |
| shared/PortalWidgets.jsx | 6069 | widgets shared by both authenticated portals |
| ui.jsx | 5066 | focused frontend component module |

Regenerate with `node scripts/generate-component-map.js`.
