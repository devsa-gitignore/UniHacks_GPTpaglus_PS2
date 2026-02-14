
# import os
# import google.generativeai as genai
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status

# from review_requests.models import ReviewRequest 

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# class ProfileSummaryView(APIView):
#     permission_classes = [IsAuthenticated] 

#     def get(self, request):
#         user = request.user
        
#         # Fetch completed requests for this user's profile
#         completed_requests = ReviewRequest.objects.filter(
#             profile_version__user=user, 
#             status='completed'
#         )
        
#         if not completed_requests.exists():
#             return Response(
#                 {"summary": "You don't have any completed reviews to summarize yet. Get back out there!"}, 
#                 status=status.HTTP_200_OK
#             )

#         # Combine the feedback
#         all_feedback = ""
#         for index, req in enumerate(completed_requests):
#             # Assuming you created the ReviewFeedback model and linked it to ReviewRequest
#             if hasattr(req, 'feedback'):
#                 all_feedback += f"\nReviewer {index + 1}:\n"
#                 all_feedback += f"Likes: {req.feedback.likes}\n"
#                 all_feedback += f"Dislikes: {req.feedback.dislikes}\n"
#                 all_feedback += f"Suggestions: {req.feedback.suggestions}\n"

#         if not all_feedback.strip():
#              return Response({"summary": "Reviews are complete, but no text feedback was left!"}, status=status.HTTP_200_OK)

#         # Ask Gemini to summarize it
#         prompt = f"""
#         You are an expert dating profile consultant. Read these anonymous reviews left on a user's dating profile. 
#         Provide a short, friendly, and actionable 2-paragraph summary. 
#         Paragraph 1: What they are doing well.
#         Paragraph 2: Common suggestions for improvement.
        
#         Here are the reviews: {all_feedback}
#         """

#         try:
#             model = genai.GenerativeModel('gemini-2.5-flash')
#             response = model.generate_content(prompt)
#             return Response({"summary": response.text}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)