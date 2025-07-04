// Используем синтаксис, который работает с стандартным jQuery от Django
(function($) {
    $(document).ready(function() {
        // Находим селект для выбора категории
        const categorySelect = $('#id_category');

        function updateAttributeOptions(categoryId) {
            // Находим все селекты для выбора атрибутов в инлайнах
            const attributeSelects = $('select[name^="attributes-"][name$="-attribute"]');

            if (!categoryId) {
                attributeSelects.html('<option value="">Сначала выберите категорию</option>');
                return;
            }

            // Делаем AJAX-запрос к нашему новому API
            $.ajax({
                url: `/api/v1/category-attributes/${categoryId}/`,
                success: function(data) {
                    let options = '<option value="">---------</option>';
                    data.forEach(function(attr) {
                        options += `<option value="<span class="math-inline">\{attr\.id\}"\></span>{attr.name}</option>`;
                    });
                    // Обновляем список опций для каждого селекта атрибутов
                    attributeSelects.html(options);
                },
                error: function() {
                    attributeSelects.html('<option value="">Ошибка загрузки атрибутов</option>');
                }
            });
        }

        // Вызываем функцию при первой загрузке страницы
        updateAttributeOptions(categorySelect.val());

        // Вызываем функцию каждый раз, когда меняется категория
        categorySelect.on('change', function() {
            updateAttributeOptions($(this).val());
        });
    });
})(django.jQuery);