export const articleMain = [
    {
        name: 'Ref và Reactive trong Vue 3',
        introduction:
            'Trong Vue 3 có hai Reactivity API mà dễ làm newbie gây nhầm lẫn khi sử dụng đó là ref và reactive . Bài viết này mình sẽ hướng dẫn cách sử dụng 2 API trên, kèm một số so sánh với Vue 2 cho những ai mới chuyển từ Vue 2 lên Vue 3. Ref Ví dụ đơn giản khi thay đổi một reactive state bằng Vue 2: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 &lt;template&gt; &lt;h1&gt;Count: {{ count }}&lt;/h1&gt; &lt;button @click="increaseCount"&gt;Increase Count&lt;/button&gt; &lt;/template&gt; &lt;script&gt; export default { data() { return { count: 0, }; }, methods: { increaseCount() { this....',
        publishedDate: new Date('2023-02-04 00:00:00 +0000 UTC'),
        readingTime: 5,
        path: 'https://huydq.dev/blog/ref-va-reactive-trong-vue-3/',
    },
    {
        name: 'Hướng dẫn tạo tài khoản và sử dụng Chat GPT chỉ với 1 cốc trà đá',
        introduction:
            'Dạo này Chat GPT đang rất hot, được thần thành hóa lên quá khiến nhiều người lo sợ nó sẽ “cướp” mất công việc của mình. Vậy Chat GPT cụ thể là gì, dùng như nào?\nBài viết này mình sẽ hướng dẫn các bạn tự tạo tài khoản cho riêng mình và trải nghiệm thử Chat GPT, một công cụ khá hữu ích nếu bạn sử dụng đúng cách. Còn nếu muốn trải nghiệm nhanh thì các bạn có thể kéo xuống cuối bài viết để lấy một số tài khoản free được chia sẻ trên mạng (dùng chung cho nhiều người)....',
        publishedDate: new Date('2023-02-01 00:00:00 +0000 UTC'),
        readingTime: 5,
        path: 'https://huydq.dev/blog/huong-dan-tao-tai-khoan-va-su-dung-chatgpt-chi-voi-1-coc-tra-da/',
    },
    {
        name: 'Chia sẻ cách học Tiếng Anh cho người nghèo',
        introduction:
            'Nếu bạn có điều kiện tài chính thì nên kiếm nguồn tài liệu hoặc khóa học nào mất phí nhưng chất lượng để có thể thông thạo Tiếng Anh càng nhanh càng tốt. Giỏi Tiếng Anh sẽ mang lại cho bạn rất nhiều lợi ích so với chi phí bỏ ra.\nOk, trước khi đọc tiếp, bạn thử bỏ ra 5 phút suy nghĩ để trả lời câu hỏi sau:...',
        publishedDate: new Date('2023-01-11 00:00:00 +0000 UTC'),
        readingTime: 8,
        path: 'https://huydq.dev/blog/chia-se-cach-hoc-tieng-anh-cho-nguoi-ngheo/',
    },
    {
        name: 'Cách tự thay dây đàn Guitar Acoustic tại nhà từ a-Z, ai cũng làm được',
        introduction:
            'Với những ai mới học chơi đàn (Guitar Acoustic) thì có cần học cách tự thay dây không? Dây đàn đứt thì làm thế nào?\nTheo ý kiến của mình thì không cần học cách tự thay dây, mang đàn ra tiệm chọn dây rồi người ta thay luôn cho mình là xong.\nThế thì mình viết bài này để làm gì? Để cho những người lười như mình, lười mang đàn ra tiệm (nếu như tiệm ở xa), hoặc chỉ đơn giản là để biết, thêm 1 kỹ năng thì cũng không thiệt đúng không?...',
        publishedDate: new Date('2023-12-24 00:00:00 +0000 UTC'),
        readingTime: 7,
        path: 'https://huydq.dev/blog/cach-tu-thay-day-dan-guitar-acoustic-tai-nha-tu-a-z-ai-cung-lam-duoc/',
    },
    {
        name: 'Debug bằng console.log theo cách PRO hơn',
        introduction:
            'Khi code các dự án bằng JavaScript (hoặc NodeJS) thì có nhiều tool để debug, nhưng mình vẫn hay debug theo kiểu nông dân đó là dùng console.log. Những ai có cùng sở thích như vậy thì có thể tham khảo bài viết này để có thể log một cách pro hơn\nCó nhiều loại log ngoài console.log Console là một object, và nó có nhiều phương thức khác nhau. Trong đó ....',
        publishedDate: new Date('2023-09-20 00:00:00 +0000 UTC'),
        readingTime: 4,
        path: 'https://huydq.dev/blog/ref-va-reactive-trong-vue-3/',
    },
    {
        name: 'Tạo App Launcher icon cho React Native app (Android + iOS)',
        introduction:
            'Trước khi đẩy app lên Store, chúng ta sẽ cần tạo App Launcher Icon (icon của ứng dụng trên máy của người dùng). App code bằng React Native sẽ có thể đẩy lên cả Google Play (Android) và App Store (iOS), do đó mình sẽ hướng dẫn cách tạo App Launcher Icon cho cả 2 hệ hiều hành trên.\nĐể tạo bộ icon cho các thiết bị với kích thước khác nhau (dùng cho cả trên store) thì chúng ta cần chuẩn bị sẵn 1 icon gốc với kích thước 1024x1024 pixels....',
        publishedDate: new Date('2023-08-08 00:00:00 +0000 UTC'),
        readingTime: 3,
        path: 'https://huydq.dev/blog/ref-va-reactive-trong-vue-3/',
    },
    {
        name: 'Cách tạo một trang blog cá nhân miễn phí dành cho dev',
        introduction:
            "Vào một ngày đẹp trời, bỗng dưng mình nảy ra ý định làm một trang blog cá nhân thay vì viết Blog trên các nền tảng có sẵn như viblo.asia, techmaster.vn, kipalog.vn, … Tất nhiên các bài viết mới vẫn sẽ đăng lên các nền tảng này để kiếm người đọc chứ blog này ma nó đọc 😅).\nÝ tưởng có rồi, nhưng thực hiện như nào, sử dụng công nghệ nào, chi phí như nào?...',Vào một ngày đẹp trời, bỗng dưng mình nảy ra ý định làm một trang blog cá nhân thay vì viết Blog trên các nền tảng có sẵn như viblo.asia, techmaster.vn, kipalog.vn, … Tất nhiên các bài viết mới vẫn sẽ đăng lên các nền tảng này để kiếm người đọc chứ blog này ma nó đọc 😅). Ý tưởng có rồi, nhưng thực hiện như nào, sử dụng công nghệ nào, chi phí như nào?...",
        publishedDate: new Date('2023-01-06 00:00:00 +0000 UTC'),
        readingTime: 6,
        path: 'https://huydq.dev/blog/debug-bang-console-log-theo-cach-pro-hon/',
    },
    {
        name: 'Tạo hiệu ứng transition cho React App với React Transition Group',
        introduction:
            'Để cho các App React hoạt động mượt mà hơn, đẹp hơn, trải nghiệm người dùng tốt hơn, … thì nên có thêm các hiệu ứng animation, transition. Bài viết này mình sẽ hướng dẫn các bạn sử dụng thư viện React Transition Group để tạo hiệu ứng transition một cách nhanh chóng. Để cho tiện thì mình sẽ demo code trên stackblitz.com. Trong ví dụ sẽ sử dụng cả React Router v6 để cấu hình multiple page, và có hiệu ứng transition giữa các page....',
        publishedDate: new Date('2021-12-14 00:00:00 +0000 UTC'),
        readingTime: 9,
        path: 'https://huydq.dev/blog/tao-hieu-ung-transition-cho-react-app-voi-react-transition-group/',
    },
    {
        name: 'Hướng dẫn sử dụng RTK Query trong Redux Toolkit',
        introduction:
            'RTK Query là một addon trong bộ thư viện Redux Toolkit. Nó giúp chúng ta thực hiện data fetching một cách đơn giản hơn thay vì sử dụng createAsyncThunk để thực hiện async action. Chú ý RTK Query là dùng để query (kết nối API), chứ không phải dùng để code async trong Redux thay cho createAsyncThunk. Nếu bạn chưa từng sử dụng Redux Toolkit thì có thể xem bài hướng dẫn này trước: Hướng dẫn sử dụng React Router và Redux Toolkit....',
        publishedDate: new Date('2021-10-13 00:00:00 +0000 UTC'),
        readingTime: 6,
        path: 'https://huydq.dev/blog/huong-dan-su-dung-rtk-query-trong-redux-toolkit/',
    },
    {
        name: 'Hướng dẫn sử dụng createAsyncThunk trong Redux Toolkit',
        introduction:
            'Nếu bạn chưa từng sử dụng Redux Toolkit thì có thể xem bài hướng dẫn này trước: Hướng dẫn sử dụng React Router và Redux Toolkit. Bài viết này mình sẽ hướng dẫn cách thực hiện các async logic (xử lý bất đồng bộ) trong Redux Toolkit, cụ thể là sử dụng createAsyncThunk để kết nối với API login. Ví dụ demo chúng ta có thể lấy luôn từ ví dụ trước rồi cải tiến thêm: https://stackblitz....',
        publishedDate: new Date('2021-10-12 00:00:00 +0000 UTC'),
        readingTime: 4,
        path: 'https://huydq.dev/blog/huong-dan-su-dung-createasyncthunk-trong-redux-toolkit/',
    },
    {
        name: 'Tái sử dụng code cho nhiều project với Git Submodules',
        introduction:
            'Không lập trình viên nào code mà không có bug. Tuy nhiên có rất nhiều lỗi cơ bản chúng ta nên tránh để tạo ra ít bug hơn, code sạch và trong sáng hơn, dễ bảo trì hơn, đỡ bị ăn chửi hơn, …\n1. Xử lý quá nhiều thứ trong một function Theo nguyên tắc Single Responsibility, một function chỉ nên thực hiện một và chỉ một nhiệm vụ duy nhất....',
        publishedDate: new Date('2021-07-18 00:00:00 +0000 UTC'),
        readingTime: 3,
        path: 'https://huydq.dev/blog/tai-su-dung-code-cho-nhieu-project-voi-git-submodules/',
    },
];

export const articleGo = [
    {
        name: 'Quản lý Dependencies trong Go bằng Govendor',
        introduction:
            'Để quản lý Dependencies (packages) trong Go chúng ta có thể dùng nhiều tool hỗ trợ. Về bản chất thì chúng tương tự nhau nhưng cũng có nhưng ưu nhược điểm riêng, ví dụ một số tool mình đã từng sử dụng như Dep hoặc Glide (tham khảo bài viết Quản lý package trong Go).\nHiện mình đang sử dụng một tool khác là Govendor, và theo ý kiến cá nhân thì mình thấy tool này dễ sử dụng hơn, và cách cấu hình cũng như hoạt động của nó khá giống với npm trên NodeJS....',
        publishedDate: new Date('2018-10-22 07:30:10 +2100 UTC'),
        readingTime: 3,
        path: 'https://huydq.dev/blog/quan-ly-dependencies-trong-go-bang-govendor/',
    },
    {
        name: 'Validate dữ liệu trong Go sử dụng Govalidator',
        introduction:
            'Trong các ứng dụng cho phép người dùng nhập dữ liệu thì đều cần phải có validate để bảo mật và đảm bảo ứng dụng chạy đúng.\nGolang có một số thư viện open source hỗ trợ chúng ta làm việc này một cách nhanh chóng, ví dụ như govalidator .\nCài đặt Cài govalidator qua package manager hoặc đơn giản là dùng go get:1 go get github.com/asaskevich/govalidator Import vào trong project:...',
        publishedDate: new Date('2018-05-18 07:30:10 +0000 UTC'),
        readingTime: 2,
        path: 'https://huydq.dev/blog/validate-du-lieu-trong-go-su-dung-govalidator/',
    },
    {
        name: 'Golang embedded type - Kế thừa trong Go',
        introduction:
            'Go không phải một ngôn ngữ hướng đối tượng (OOP). Tuy nhiên chúng ta có thể áp dụng một số ưu điểm của hướng đối tượng vào trong Go. Chúng ta có Struct (tương tự Class), Interface và Method. Để sử dụng thuộc tính “kế thừa” trong Go ta sẽ dùng embedded type. Embedded Type là khai báo một type nằm trong một type khác nhưng không khai báo tên, trường mà không khai báo tên còn được gọi là embedded field....',
        publishedDate: new Date('2018-05-16 03:22:11 +0000 UTC'),
        readingTime: 2,
        path: 'https://huydq.dev/blog/golang-embedded-type-ke-thua-trong-go/',
    },
    {
        name: 'Cách tự thay dây đàn Guitar Acoustic tại nhà từ a-Z, ai cũng làm được',
        introduction:
            'Với những ai mới học chơi đàn (Guitar Acoustic) thì có cần học cách tự thay dây không? Dây đàn đứt thì làm thế nào?\nTheo ý kiến của mình thì không cần học cách tự thay dây, mang đàn ra tiệm chọn dây rồi người ta thay luôn cho mình là xong.\nThế thì mình viết bài này để làm gì? Để cho những người lười như mình, lười mang đàn ra tiệm (nếu như tiệm ở xa), hoặc chỉ đơn giản là để biết, thêm 1 kỹ năng thì cũng không thiệt đúng không?...',
        publishedDate: new Date('2023-12-24 00:00:00 +0000 UTC'),
        readingTime: 7,
        path: 'https://huydq.dev/blog/cach-tu-thay-day-dan-guitar-acoustic-tai-nha-tu-a-z-ai-cung-lam-duoc/',
    },
    {
        name: 'Debug bằng console.log theo cách PRO hơn',
        introduction:
            'Khi code các dự án bằng JavaScript (hoặc NodeJS) thì có nhiều tool để debug, nhưng mình vẫn hay debug theo kiểu nông dân đó là dùng console.log. Những ai có cùng sở thích như vậy thì có thể tham khảo bài viết này để có thể log một cách pro hơn\nCó nhiều loại log ngoài console.log Console là một object, và nó có nhiều phương thức khác nhau. Trong đó ....',
        publishedDate: new Date('2023-09-20 00:00:00 +0000 UTC'),
        readingTime: 4,
        path: 'https://huydq.dev/blog/ref-va-reactive-trong-vue-3/',
    },
    {
        name: 'Học Go cấp tốc Phần 5:  Methods và Interfaces',
        introduction:
            'Các phần trước:\nPhần 1: Packages, variables và functions.\nPhần 2: Điều khiển luồng với if, else, switch và defer.\nPhần 3: Arrays và Slices.\nPhần 4: Structs và Maps.\nMethods Trong Go không có class, chúng ta có thể dùng struct thay cho class như ở phần trước. Tuy nhiên trong struct mới chỉ có thuộc tính chứ chưa có phương thức. Để ứng dụng được phương thức (method) như các ngôn ngữ hướng đối tượng khác ta sẽ cần khai báo function kèm theo một tham số đặc biệt gọi là receiver argument....',
        publishedDate: new Date('2018-03-21 00:00:00 +0000 UTC'),
        readingTime: 4,
        path: 'https://huydq.dev/blog/hoc-go-cap-toc-phan-5-methods-va-interfaces/',
    },
    {
        name: 'Học Go cấp tốc Phần 4:  Methods và Interfaces',
        introduction:
            'Các phần trước:\nPhần 1: Packages, variables và functions.\nPhần 2: Điều khiển luồng với if, else, switch và defer.\nPhần 3: Arrays và Slices.\nStructs Tương tự C, một struct trong Go là tập hợp các trường (field) do người dùng tự định nghĩa. Mỗi trường có thể có kiểu dữ liệu khác nhau, thậm chí có thể là một struct. Trong Go không có class như các ngôn ngữ hướng đối tượng, do đó chúng ta có thể dùng struct thay cho class....',
        publishedDate: new Date('2018-03-20 00:00:00 +0000 UTC'),
        readingTime: 4,
        path: 'https://huydq.dev/blog/hoc-go-cap-toc-phan-4-methods-va-interfaces/',
    },
];
